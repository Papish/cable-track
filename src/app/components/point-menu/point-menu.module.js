import angular from 'angular';

import {PointMenuComponent} from './point-menu.component';
import PointMenuService from './point-menu.service';

angular
  .module('pointMenu', [])
  .component('pointMenu', PointMenuComponent)
  .service('PointMenuService', PointMenuService);
