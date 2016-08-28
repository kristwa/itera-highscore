/// <reference path="../../../typings/index.d.ts" />

import { WebsocketService } from './websocket-service';
import { HighscoreService } from './highscore-service';
import { TimeService } from './time-service';

'use strict';

angular
    .module('app.services', ['ngWebSocket', 'uuid4', 'LocalStorageModule'])
    .service("websocketService", WebsocketService)
    .service("highscoreService", HighscoreService)
    .service("timeService", TimeService);
    
    



