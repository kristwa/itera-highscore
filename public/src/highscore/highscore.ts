/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.highscore {

    'use strict';

    export interface IHighscoreCtrl {}
    export class HighscoreCtrl implements IHighscoreCtrl {

        highscores: Array<app.services.HighscoreEntry>;
        highlightIndex = -1; 

        constructor(
            public $scope: ng.IScope,
            private highscoreService: app.services.IHighscoreService,
            public timeService: app.services.ITimeService,
            private $stateParams: HighscoreStateParams
        ){
            this.highscores = highscoreService.highscores;

            if ($stateParams.placement) {
                this.highlightIndex = parseInt($stateParams.placement);
            }
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

    class HighscoreStateParams implements ng.ui.IStateParamsService {
        placement: string;
    }
}
