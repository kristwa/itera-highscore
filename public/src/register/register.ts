/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.register {

    'use strict';

    export interface IRegisterCtrl {}
    export class RegisterCtrl implements IRegisterCtrl {
        result: string;
        entry: app.services.HighscoreEntry;
        customEntryMode = false;

        constructor(
            public $scope: ng.IScope,
            private websocketService: app.services.IWebsocketService,
            private highscoreService: app.services.IHighscoreService,
            private $stateParams: RegisterStateParams,
            private $state: ng.ui.IStateService,
            public timeService: app.services.TimeService
        ){
            var entry = parseInt($stateParams.id);
            this.result = websocketService.results[$stateParams.id];
            this.entry = new app.services.HighscoreEntry();

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
            var placement = this.websocketService.registerHighScore(this.entry, parseInt(this.$stateParams.id));
            this.$state.go("highscore", {placement: placement});            
        }

        deleteResult() {
            if (this.customEntryMode) {
                this.$state.go("scoreselect");
            } else {
                this.websocketService.removeItemByResult(this.entry.time);
                this.$state.go("scoreselect");
            }
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

    
}
