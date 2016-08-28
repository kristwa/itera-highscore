/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />

import { IWebsocketService } from '../services/websocket-service';
import { ITimeService } from '../services/time-service';
import { HighscoreEntry } from '../services/models';

'use strict';

export interface IRegisterCtrl {}
export class RegisterCtrl implements IRegisterCtrl {
    result: string;
    entry: HighscoreEntry;
    customEntryMode = false;

    constructor(
        public $scope: ng.IScope,
        private websocketService: IWebsocketService,
        private $stateParams: RegisterStateParams,
        private $state: any,
        public timeService: ITimeService
    ){
        var entry = parseInt($stateParams.id);
        this.result = websocketService.results[$stateParams.id];
        this.entry = new HighscoreEntry();

        if (entry >= 0) {
            this.entry.time = parseInt(this.result);
        } else {
            this.customEntryMode = true;
        }
    }

    submit() {
        if (this.customEntryMode) {
            this.entry.time = this.timeService.getMillisecondsFromSeconds(this.entry.time);
        }

        console.log("Form submitted");
        console.log(this.entry);
        this.websocketService.registerHighScore(this.entry, parseInt(this.$stateParams.id));
        this.$state.go("highscore", {});            
    }
}


angular
    .module('app.register', ['app.services', 'ui.router'])
    .component("register", {
        templateUrl: 'app-templates/register/register.html',
        controller:  RegisterCtrl,
        controllerAs: 'vm'            
    })
    .controller("registerCtrl", RegisterCtrl);

export class RegisterStateParams implements ng.ui.IStateParamsService {
    id: string;
}

    

