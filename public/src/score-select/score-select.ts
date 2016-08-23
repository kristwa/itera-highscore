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
            private timeService: app.services.ITimeService
        ){
            this.results = websocketService.results;
        }

        displayTime(milliseconds: string): string {
            return this.timeService.getTimeForMilliseconds(parseInt(milliseconds));
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
