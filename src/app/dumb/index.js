import {LoginForm} from './LoginForm/LoginForm';
import {AddPointForm} from './AddPointForm/AddPointForm';

/** @ngInject */
angular
	.module('AppDumbComponentsModule', [])
	.component('appLoginForm', LoginForm)
	.component('appAddPointForm', AddPointForm);
