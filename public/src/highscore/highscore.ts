/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.highscore {

    'use strict';

    export interface IHighscoreCtrl {}
    export class HighscoreCtrl implements IHighscoreCtrl {

        highscores: Array<app.services.HighscoreEntry>;

        constructor(
            public $scope: ng.IScope,
            private highscoreService: app.services.IHighscoreService,
            public timeService: app.services.ITimeService
        ){
            this.highscores = highscoreService.highscores;
        }
    }


    angular
        .module('app.highscore', ['app.services'])
        .component("highscore", {
            templateUrl: 'app-templates/highscore/highscore.html',
            controller:  HighscoreCtrl,
            controllerAs: 'vm'            
        })
        .controller("highscoreCtrl", HighscoreCtrl);
}
