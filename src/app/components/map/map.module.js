import angular from 'angular';

import {MapComponent} from './map.component';
import {MapMarkerComponent} from './map-marker/map-marker.component';
import {MapSearchComponent} from './map-search/map-search.component';
import {MapSidebarComponent} from './map-sidebar/map-sidebar.component';

import MapService from './map.service';
import MapMarkerService from './map-marker/map-marker.service';

angular
  .module('wsApp.map', [])
  .component('map', MapComponent)
  .component('mapSearch', MapSearchComponent)
  .component('mapMarker', MapMarkerComponent)
  .component('mapSidebar', MapSidebarComponent)
  .service('MapService', MapService)
  .service('MapMarkerService', MapMarkerService);
