// import routesConfig from './routes';
import {Login} from './Login';
import {UsersService} from './users';

/** @ngInject */
angular
	.module('app.users', [])
	// .config(routesConfig)
	.component('appLogin', Login)
	.service('AppUsersService', UsersService);
