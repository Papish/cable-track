import angular from 'angular';

import {amplifier} from './amplifier/amplifier.component';

import {AmplifiersService} from './amplifiers.service';

angular
  .module('wsApp.devices.amplifiers', [])
  .component('amplifier', amplifier)
  .service('Amplifiers', AmplifiersService);
