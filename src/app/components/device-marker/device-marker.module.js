import angular from 'angular';

import {DeviceMarkerComponent} from './device-marker.component';
import DeviceMarkerService from './device-marker.service';
import {DeviceLinksComponent} from './device-links/device-links.component';

import './device-marker.scss';

angular
  .module('deviceMarker', [])
  .component('deviceMarker', DeviceMarkerComponent)
  .component('deviceLinks', DeviceLinksComponent)
  .service('DeviceMarkerService', DeviceMarkerService);
