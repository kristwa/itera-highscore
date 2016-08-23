/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.admin {

    'use strict';

    export interface IAdminCtrl {}
    export class AdminCtrl implements IAdminCtrl {
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
        .module('app.admin', ['app.services'])
        .component("admin", {
            templateUrl: 'app-templates/admin/admin.html',
            controller:  AdminCtrl,
            controllerAs: 'vm'            
        })
        .controller("adminCtrl", AdminCtrl);
}