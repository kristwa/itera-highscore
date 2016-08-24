/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.winnerselection {

    'use strict';

    export interface IWinnerSelectionCtrl {}
    export class WinnerSelectionCtrl implements IWinnerSelectionCtrl {
        highscores: Array<app.services.HighscoreEntry>;
        winner: app.services.HighscoreEntry;

        constructor(
            public $scope: ng.IScope,
            private highscoreService: app.services.IHighscoreService
        ){
            this.highscores = this.highscoreService.highscores;
        }

        pickWinner() {
            var randomIterations = Math.floor(Math.random() * 25);

            for(let i=0; i <= randomIterations; i++) {
                var randomEntry = Math.floor(Math.random() * this.highscores.length);
                this.winner = this.highscores[randomEntry];
            }
        }

    }


    angular
        .module('app.winnerselection', ['app.services'])
        .component("winnerSelection", {
            templateUrl: 'app-templates/winner-selection/winner-selection.html',
            controller:  WinnerSelectionCtrl,
            controllerAs: 'vm'            
        })
        .controller("winnerSelectionCtrl", WinnerSelectionCtrl);
}
