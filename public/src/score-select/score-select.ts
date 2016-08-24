/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.scoreselect {

    'use strict';

    export interface IScoreSelectCtrl {}
    export class ScoreSelectCtrl implements IScoreSelectCtrl {
        results: Array<string>;

        constructor(
            public $scope: ng.IScope,
            private websocketService: app.services.IWebsocketService,
            private timeService: app.services.ITimeService,
            private $state: ng.ui.IState
        ){
            this.results = websocketService.results;

            if (this.results.length === 1) {
                this.$state.go("register", {id: 0});
            }
        }

        displayTime(milliseconds: string): string {
            return this.timeService.getTimeForMilliseconds(milliseconds);
        }

        removeItem(index: number): void {
            this.websocketService.removeItem(index);
        }
    }


    angular
        .module('app.scoreselect', ['app.services'])
        .component("scoreSelect", {
            templateUrl: 'app-templates/score-select/score-select.html',
            controller:  ScoreSelectCtrl,
            controllerAs: 'vm'            
        })
        .controller("scoreselectCtrl", ScoreSelectCtrl);
}
