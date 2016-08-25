/// <reference path="../../../typings/index.d.ts" />

angular.module('iteraHighscoreApp', [
    'app.services',
    'app.templates',
    'app.scoreselect',
    'app.winnerselection',
    'app.register',
    'app.highscore',
    'app.admin',
    'ngWebSocket',
    'ui.router',
    'uuid4',
    'LocalStorageModule',
    'ngAnimate',
    'toastr'
])
.config(function($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise("/highscore");

    $stateProvider

        .state("highscore", {
            url: "/highscore",
            template: "<highscore></highscore>"
        })

        .state("scoreselect", {
            url: "/scoreselect",
            template: "<score-select></score-select>"
        })

        .state("register", {
            url: "/register/:id",
            template: "<register></register>"
        })

        .state("admin", {
            url: "/admin",
            template: "<admin></admin>"
        })

        .state("winner", {
            url: "/winnerselection",
            template: "<winner-selection><winner-selection>"
        })
})
.config(function(localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('itera');
});

// your app setup here
