/// <reference path="../../../typings/index.d.ts" />

module app.services {

    'use strict';

    export interface IWebsocketService {
        results: Array<string>;
        isConnected: boolean;

        removeItem(index: number): void;
        removeItemByResult(result: number): void;
        sendCommand(command: string): void;
        registerHighScore(entry: HighscoreEntry, index: number): number;
        sendHighscoreCommand(entry: HighscoreEntry): void;
    }

    
    export class WebsocketService implements IWebsocketService {
        isConnected: boolean = false;
        results: Array<string>;
        ws: angular.websocket.IWebSocket;
        
        constructor(
            private $websocket: angular.websocket.IWebSocket, 
            private uuid4: any,
            private highscoreService: IHighscoreService,
            private localStorageService: angular.local.storage.ILocalStorageService,
            private $timeout: angular.ITimeoutService,
            private toastr: any)
        {
            this.results = this.localStorageService.get<Array<string>>('unregistered-scores') || [];
            this.setupWebsocket();
        }

        setupWebsocket() {
            this.ws = this.$websocket("ws://192.168.1.2:8080"); // this.$websocket("ws://localhost:8080");  // 
           
            this.ws.onOpen(() => {
                this.toastr.success("Kontakt med websocket opprettet!");
                this.isConnected = true;
                console.log("connection opened")
            });

            this.ws.onClose(() => {
                this.toastr.error("Kontakt med websocket lukket. Prøver å opprette ny tilkobling.");
                this.isConnected = false;
                console.log("connection closed");

                this.$timeout(() => {
                    this.setupWebsocket();
                }, 3000);
            });
            this.ws.onError(() => {
                this.isConnected = false;
                console.log("connection error");
            });
            this.ws.onMessage((msg: any) => {
                if ( msg.data) {
                    var op = JSON.parse(msg.data);

                    if (op.finishedWithTime) {
                        console.log(op.finishedWithTime);
                        this.results.push(op.finishedWithTime); 
                        this.localStorageService.set<Array<string>>("unregistered-scores", this.results);
                    } else if (op.allHighscores) {
                        console.log(op.allHighscores);
                        var highscores = <Array<HighscoreEntry>>op.allHighscore;
                        this.localStorageService.set<Array<HighscoreEntry>>("highscores", highscores);
                        // this.highscoreService.resyncLocalHighscore(op.highscore);
                    }
                }
                console.log(msg); 
            });
        }
        
        registerHighScore(entry: HighscoreEntry, index: number) {
            this.sendHighscoreCommand(entry);

            // send to local storage
            var placement = this.highscoreService.storeHighscoreEntry(entry);
            
            // remove item from array and restore in local storage, as it is now registered
            this.removeItem(index);

            return placement;
        }

        sendHighscoreCommand(entry: HighscoreEntry) {
            var object = new SocketHighscoreEntry();
            object.registerUser = entry;
            this.ws.send(object);
        }

        sendCommand(command: string): void {
            var stringify = JSON.stringify(new StandardCommand(command));
            this.ws.send(stringify);
            console.log('Websocket command sent: ', stringify);
        }

        removeItem(index: number): void {
            _.pullAt(this.results, index);
            this.localStorageService.set<Array<string>>("unregistered-scores", this.results);
            console.log("pulled index:" + index + ", new array: " + this.results);
        }

        removeItemByResult(result: number): void {
            _.pull(this.results, '' + result);
            this.localStorageService.set<Array<string>>("unregistered-scores", this.results);
            console.log("pulled result:" + result + ", new array: " + this.results);
        }

    }

    export interface IHighscoreService {
        highscores: Array<HighscoreEntry>;
        storeHighscoreEntry(entry: HighscoreEntry): number;
        resyncLocalHighscore(entries: Array<HighscoreEntry>): void;
        deleteHighscoreEntryByIndex(index: number): void;
    }

    export class HighscoreService implements IHighscoreService  {
        getExcited: string = "false";
        highscores: Array<HighscoreEntry>;

        constructor(
            private localStorageService: angular.local.storage.ILocalStorageService)
        {
            this.fetchHighscores();
        }

        resyncLocalHighscore(entries: Array<HighscoreEntry>): void {
            this.highscores = this.sortEntries(entries);
            this.setHighscores();
        }

        storeHighscoreEntry(entry: HighscoreEntry): number {
            this.highscores.push(entry);
            this.highscores = this.sortEntries(this.highscores);
            this.setHighscores();
            return this.findEntryIndex(entry.name, entry.time);
        }

        deleteHighscoreEntryByIndex(index: number): void {
            _.pullAt(this.highscores, index);
            this.setHighscores();
        }

        private fetchHighscores() {
            var storageHighscores = this.localStorageService.get<Array<HighscoreEntry>>("highscores");
            if (storageHighscores) {
                this.highscores = storageHighscores;
            } else {
                console.log('nothing in storage:' + storageHighscores);
                this.highscores = [];
            }
        }


        private setHighscores() {
            this.localStorageService.set<Array<HighscoreEntry>>("highscores", this.highscores);
        }

        private sortEntries(entries: Array<HighscoreEntry>) {
            return _.sortBy(this.highscores, ['time']);
        }

        private findEntryIndex(name: string, time: number) {
            return _.findIndex(this.highscores, { 'name': name, 'time': time });
        }
        
    }

    export interface ITimeService {
        getTimeForMilliseconds(milsec: string): string;
        getMillisecondsFromSeconds(seconds: number): void;
    }

    export class TimeService implements ITimeService {
        getTimeForMilliseconds(milsec: string): string {
            var ms = parseInt(milsec);
            var min = (ms/1000/60) << 0;
            var sec = (ms/1000) % 60;
            return min + " minutter, " + parseInt(sec + "") + " sekunder";
        }

        getMillisecondsFromSeconds(seconds: number) {
            return seconds*1000;
        }
    }

    angular
        .module('app.services', ['ngWebSocket', 'uuid4', 'LocalStorageModule'])
        .service("websocketService", WebsocketService)
        .service("highscoreService", HighscoreService)
        .service("timeService", TimeService);
    
    export class HighscoreEntry {
        time: number;
        name: string;
        email: string;       
    }

    export class SocketHighscoreEntry {
        registerUser: HighscoreEntry;
    }

    export class StandardCommand {
        command: string;
        constructor(command: string) {
            this.command = command;
        }

    }


}
