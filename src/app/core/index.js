import {googleMarker} from './directives/Marker';
import MarkerManagerService from './services/marker';

/** @ngInject */
angular
	.module('app.core', [])
	.directive('appMarker', googleMarker)
	.service('MarkerManager', MarkerManagerService);
