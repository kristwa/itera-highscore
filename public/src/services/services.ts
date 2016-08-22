/// <reference path="../../../typings/index.d.ts" />

module app.services {

    'use strict';

    export interface IWebsocketService {
        results: Array<string>;
        isConnected: boolean;

        registerHighScore(entry: HighscoreEntry, index: number): void;
    }

    
    export class WebsocketService implements IWebsocketService {
        isConnected: boolean = false;
        results: Array<string>;
        ws: angular.websocket.IWebSocket;
        
        constructor(private $websocket: angular.websocket.IWebSocket, private uuid4: any, private highscoreService: app.services.IHighscoreService){
            this.results = [];
            this.ws = $websocket("ws://localhost:8080");
           
            this.ws.onOpen(() => {
                this.isConnected = true;
                console.log("connection opened")
            });

            this.ws.onClose(() => {
                this.isConnected = false;
                console.log("connection closed");
            });
            this.ws.onError(() => {
                this.isConnected = false;
                console.log("connection error");
            });
            this.ws.onMessage((msg: any) => {
                if ( msg.data) {
                    var op = JSON.parse(msg.data);

                    if (op.finishedWithTime) {
                        this.results.push(op.finishedWithTime); 
                    }
                }
                console.log(msg); 
            });
        }

        registerHighScore(entry: HighscoreEntry, index: number) {
            var object = new SocketHighscoreEntry();
            object.registerUser = JSON.stringify(entry);
            console.log(this.uuid4.generate());
            this.ws.send(JSON.stringify(object));

            // send to local storage
            this.highscoreService.storeHighscoreEntry(entry);
            
            // remove item from array, as it is now registered
            _.pullAt(this.results, index);
            console.log("pulled index:" + index + ", new array: " + this.results);
        }

    }

    export interface IHighscoreService {
        highscores: Array<HighscoreEntry>;
        storeHighscoreEntry(entry: HighscoreEntry): void;
    }

    export class HighscoreService implements IHighscoreService  {
        getExcited: string = "false";
        highscores: Array<HighscoreEntry>;

        constructor(private localStorageService: angular.local.storage.ILocalStorageService){
            this.fetchHighscores();
        }

        fetchHighscores() {
            var storageHighscores = this.localStorageService.get<Array<HighscoreEntry>>("highscores");
            if (storageHighscores) {
                this.highscores = storageHighscores;
            } else {
                console.log('nothing in storage:' + storageHighscores);
                this.highscores = [];
            }
        }

        setHighscores() {
            this.localStorageService.set<Array<HighscoreEntry>>("highscores", this.highscores);
        }

        storeHighscoreEntry(entry: HighscoreEntry) {
            this.highscores.push(entry);
            this.highscores = _.sortBy(this.highscores, ['time']);
            this.setHighscores();

        }
        
    }

    angular
        .module('app.services', ['ngWebSocket', 'uuid4', 'LocalStorageModule'])
        .service("websocketService", WebsocketService)
        .service("highscoreService", HighscoreService);
    
    export class HighscoreEntry {
        time: number;
        name: string;
        email: string;
        uuid: string;        
    }

    export class SocketHighscoreEntry {
        registerUser: string;
    }


}
