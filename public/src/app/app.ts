/// <reference path="../../../typings/index.d.ts" />

angular.module('iteraHighscoreApp', [
    'app.demo',
    'app.services',
    'app.templates',
    'app.scoreselect',
    'app.register',
    'app.highscore',
    'ngWebSocket',
    'ui.router',
    'uuid4',
    'LocalStorageModule'
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
})
.config(function(localStorageServiceProvider: angular.local.storage.ILocalStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('itera');
});

// your app setup here
