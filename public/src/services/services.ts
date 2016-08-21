/// <reference path="../../../typings/index.d.ts" />

module app.services {

    'use strict';

    export interface IWebsocketService {
        results: Array<string>;
        isConnected: boolean;

        registerHighScore(entry: HighscoreEntry);
    }

    
    export class WebsocketService implements IWebsocketService {
        isConnected: boolean = false;
        results: Array<string>;
        ws: angular.websocket.IWebSocket;

        constructor(private $websocket: angular.websocket.IWebSocket){
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
                if (msg.data) {
                    var tmp = JSON.parse(msg.data);
                    this.results.push(tmp.finishedWithTime);
                }
                console.log(msg); 
            });
        }

        registerHighScore(entry: HighscoreEntry) {
            this.ws.send(JSON.stringify(entry));
        }

    }

    export interface ILocalStorageService {
        storeHighscoreEntry(entry: HighscoreEntry);
    }

    export class LocalStorageService implements ILocalStorageService {
        getExcited: string = "false";

        constructor(){
            
        }
        
        storeHighscoreEntry(entry: HighscoreEntry) {

        }
        
    }

    angular
        .module('app.services', ['ngWebSocket', 'uuid4'])
        .service("websocketService", WebsocketService)
        .service("localStorageService", LocalStorageService);
    
    export class HighscoreEntry {


        time: number;
        name: string;
        email: string;
        uuid: string;

        
    }


}
