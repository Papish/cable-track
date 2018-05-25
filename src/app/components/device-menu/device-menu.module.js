import angular from 'angular';

import {DeviceMenuComponent} from './device-menu.component';
import DeviceMenuService from './device-menu.service';

import './device-menu.scss';

angular
  .module('deviceMenu', [])
  .component('deviceMenu', DeviceMenuComponent)
  .service('DeviceMenuService', DeviceMenuService);
