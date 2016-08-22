/// <reference path="../../../typings/index.d.ts" />

angular.module('iteraHighscoreApp', [
    'app.demo',
    'app.services',
    'app.templates',
    'app.home',
    'app.register',
    'ngWebSocket',
    'ui.router',
    'uuid4',
    'LocalStorageModule'
])
.config(function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider

        .state("home", {
            url: "/home",
            template: "<home></home>"
        })

        .state("register", {
            url: "/register/:id",
            template: "<register></register>"
        })
})
.config(function(localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('itera');
});

// your app setup here
