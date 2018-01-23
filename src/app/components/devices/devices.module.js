import angular from 'angular';

import './nodes/nodes.module.js';
import './amplifiers/amplifiers.module';
import './splitters/splitters.module';
import './tapoffs/tapoffs.module';

import {DevicesComponent} from './devices.component';

import './cables/cables.module';

/** @ngInject */
angular
  .module('wsApp.devices', ['wsApp.devices.nodes', 'wsApp.devices.amplifiers', 'wsApp.devices.splitters', 'wsApp.devices.tapoffs', 'cable'])
  .component('devices', DevicesComponent);
