import angular from 'angular';

import {DeviceMenuComponent} from './device-menu.component';
import DeviceMenuService from './device-menu.service';

angular
  .module('deviceMenu', [])
  .component('deviceMenu', DeviceMenuComponent)
  .service('DeviceMenuService', DeviceMenuService);
