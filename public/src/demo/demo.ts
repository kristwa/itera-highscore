/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.demo {

    'use strict';

    export interface IDemoCtrl {}
    export class DemoCtrl implements IDemoCtrl {
        valueFromService: Array<string>;

        constructor(
            public $scope: ng.IScope,
            private websocketService: app.services.IWebsocketService
        ){
            this.valueFromService = websocketService.results;
        }
    }

    export interface IDemoService {
        getExcited: boolean;
    }
    export class DemoService implements IDemoService {
        getExcited: boolean = false;
    }

    angular
        .module('app.demo', ['app.services'])
        .component("demo", {
            templateUrl: 'app-templates/demo/demo.html',
            controller:  DemoCtrl,
            controllerAs: 'demoCtrlVM'        
        })
        .controller("demoCtrl", DemoCtrl)
        .factory("demoService", [() => new app.demo.DemoService()]);
}
