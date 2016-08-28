/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />

import { IWebsocketService } from '../services/websocket-service';
import { ITimeService } from '../services/time-service';

'use strict';

export interface IScoreSelectCtrl {}
export class ScoreSelectCtrl implements IScoreSelectCtrl {
    results: Array<string>;

    constructor(
        public $scope: ng.IScope,
        private websocketService: IWebsocketService,
        private timeService: ITimeService,
        private $state: any
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

    registerCustom() {
        this.$state.go("register", {id: -1});
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

