/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.register {

    'use strict';

    export interface IRegisterCtrl {}
    export class RegisterCtrl implements IRegisterCtrl {
        result: string;
        entry: app.services.HighscoreEntry;

        constructor(
            public $scope: ng.IScope,
            private websocketService: app.services.IWebsocketService,
            private $stateParams: RegisterStateParams
        ){

            this.result = websocketService.results[$stateParams.id];
            this.entry = new app.services.HighscoreEntry();
            this.entry.time = parseInt(this.result);
        }

        submit() {
            console.log("Form submitted");
            console.log(this.entry);
            this.websocketService.registerHighScore(this.entry);            
        }
    }


    angular
        .module('app.register', ['app.services'])
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
