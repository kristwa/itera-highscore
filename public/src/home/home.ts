/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.home {

    'use strict';

    export interface IHomeCtrl {}
    export class HomeCtrl implements IHomeCtrl {
        results: Array<string>;
        highscores: Array<app.services.HighscoreEntry>;

        constructor(
            public $scope: ng.IScope,
            private websocketService: app.services.IWebsocketService,
            private highscoreService: app.services.IHighscoreService
        ){
            this.results = websocketService.results;
            this.highscores = highscoreService.highscores;
        }
    }


    angular
        .module('app.home', ['app.services'])
        .component("home", {
            templateUrl: 'app-templates/home/home.html',
            controller:  HomeCtrl,
            controllerAs: 'vm'            
        })
        .controller("homeCtrl", HomeCtrl);
}
