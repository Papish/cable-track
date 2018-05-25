/**
 * Application root
 * Top level angular module loader
 *
 * @author: Papish Limbu
 */
import angular from 'angular';
import routesConfig from './routes';
import runConfig from './config';

import 'angular-resource';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';
import 'angular-loading-bar';

import './constant';
import './index.scss';
import './app';
// import 'angular-loading-bar/src/loading-bar.js';

import ngRedux from 'ng-redux';
import {reducers} from './app/store';
import {createLogger} from 'redux-logger';

const env = 'production';
// const evn = 'development';

/** @ngInject */
angular
  .module('wsApp', [
    // Core
    'ui.router',
    'ui.bootstrap',
    // Third party Modules
    'ngResource',
    'ngMaterial',
    'angular-loading-bar',
    'ngAnimate',
    ngRedux,
    'toastr',
    // Custom
    'wsApp.config',
    'wsApp.app'
  ])
  .config(routesConfig)
  .config((cfpLoadingBarProvider, $ngReduxProvider) => {
    'ngInject';

    cfpLoadingBarProvider.includeSpinner = false;
    if (env === 'production') {
      $ngReduxProvider.createStoreWith(reducers);
    } else if (env === 'development') {
      $ngReduxProvider.createStoreWith(reducers, [createLogger()]);
    }
  })
  .run(runConfig);
