import angular from 'angular';

import {tapoff} from './tapoff/tapoff.component';

import {TapoffsService} from './tapoffs.service';

angular
  .module('wsApp.devices.tapoffs', [])
  .component('tapoff', tapoff)
  .service('Tapoffs', TapoffsService);
