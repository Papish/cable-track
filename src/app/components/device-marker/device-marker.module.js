import angular from 'angular';

import {DeviceMarkerComponent} from './device-marker.component';
import DeviceMarkerService from './device-marker.service';
import {DeviceLinksComponent} from './device-links/device-links.component';
import {deviceMarkerList} from './device-marker-list/device-marker-list';
import {deviceMarkerCont} from './device-marker-cont/device-marker-cont';

import './device-marker.scss';

angular
  .module('deviceMarker', [])
  .component('deviceMarker', DeviceMarkerComponent)
  .component('deviceLinks', DeviceLinksComponent)
  .component('deviceMarkerList', deviceMarkerList)
  .component('deviceMarkerCont', deviceMarkerCont)
  .service('DeviceMarkerService', DeviceMarkerService);
