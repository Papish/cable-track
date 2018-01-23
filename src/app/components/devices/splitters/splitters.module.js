import angular from 'angular';

import {splitter} from './splitter/splitter.component';

import {SplittersService} from './splitters.service';

angular
  .module('wsApp.devices.splitters', [])
  .component('splitter', splitter)
  .service('Splitters', SplittersService);
