import angular from 'angular';

import {PointsComponent} from './points.component';
import {PointMarkerComponent} from './point-marker/point-marker.component';
import {PointNewComponent} from './point-new/point-new.component';
import {PointFormComponent} from './point-form/point-form.component';
import {pointDevices} from './point-devices/point-devices.component';

import PointService from './point.service';

angular
  .module('wsApp.points', [])
  .component('points', PointsComponent)
  .component('pointMarker', PointMarkerComponent)
  .component('pointNew', PointNewComponent)
  .component('pointForm', PointFormComponent)
  .component('pointDevices', pointDevices)
  .service('PointService', PointService);
