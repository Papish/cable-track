import angular from 'angular';

import './common/app.module';
import './components/devices/devices.module';
import './components/dashboard/dashboard.module';
import './components/map/map.module';
import './components/points/points.module';
import './components/users/users.module';

import {home} from './components/home/home.component';

// Modules
import './components/device-menu/device-menu.module';
import './components/point-menu/point-menu.module';
import './components/device-marker/device-marker.module';
import './components/connections/connections.module';

// Containers modules
import './containers/googleMap';
import './containers/users';
import './containers/points';

// Component modules
import './dumb';
import './core';

/** @ngInject */
angular
  .module('wsApp.app', [
		'wsApp.common',
		'wsApp.dashboard',
		'wsApp.devices',
		'wsApp.users',
		'wsApp.map',
		'wsApp.points',
		'connections',
		'deviceMenu',
		'pointMenu',
		'deviceMarker',
		// Container modules
		'app.users',
		'app.points',
		'app.core',
		'app.map',
		'AppDumbComponentsModule'
	])
	.component('home', home);
