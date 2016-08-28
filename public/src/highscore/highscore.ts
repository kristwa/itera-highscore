/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../services/services.ts" />

import { IHighscoreService } from '../services/highscore-service';
import { ITimeService } from '../services/time-service';
import { HighscoreEntry } from '../services/models';


'use strict';

export interface IHighscoreCtrl {}
export class HighscoreCtrl implements IHighscoreCtrl {

    highscores: Array<HighscoreEntry>;

    constructor(
        public $scope: ng.IScope,
        private highscoreService: IHighscoreService,
        public timeService: ITimeService
    ){
        this.highscores = highscoreService.highscores;
    }
}


angular
    .module('app.highscore', ['app.services'])
    .component("highscore", {
        templateUrl: 'app-templates/highscore/highscore.html',
        controller:  HighscoreCtrl,
        controllerAs: 'vm'            
    })
    .controller("highscoreCtrl", HighscoreCtrl);
