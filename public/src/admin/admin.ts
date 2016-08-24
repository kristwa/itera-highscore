/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />


module app.admin {

    'use strict';

    export interface IAdminCtrl {}
    export class AdminCtrl implements IAdminCtrl {

        superSecretPwd = "1234";
        pwd: string;
        pwdError = false;
        isAuthenticated = false;
        
        constructor(
            public $scope: ng.IScope,
            private $state: ng.ui.IState
        ){
            
        }

        auth() {
            if (this.pwd === this.superSecretPwd) {
                this.isAuthenticated = true;
            }
            else {
                this.pwdError = true;
                this.isAuthenticated = false;
            }
        }

        goTo(state: string) {
            this.$state.go(state);
        }
    }


    angular
        .module('app.admin', ['app.services'])
        .component("admin", {
            templateUrl: 'app-templates/admin/admin.html',
            controller:  AdminCtrl,
            controllerAs: 'vm'            
        })
        .controller("adminCtrl", AdminCtrl);
}