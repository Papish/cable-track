/**
 * Application root
 * Top level angular module loader
 *
 * @author: Papish Limbu
 */
import angular from 'angular';
import ngRedux from 'ng-redux';
import routesConfig from './routes';
import runConfig from './config';

import 'angular-resource';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';

import './constant';
import './index.scss';
import './app/app.module';
import {reducers} from './app/store';

/** @ngInject */
angular
  .module('wsApp', [
    // Core
    'ui.router',
    'ui.bootstrap',
    // Modules
    'ngResource',
    'ngMaterial',

    ngRedux,
    'toastr',
    // Custom
    'wsApp.config',
    'wsApp.app'
  ])
  .config(routesConfig)
  .config($ngReduxProvider => {
    'ngInject';
    $ngReduxProvider.createStoreWith(reducers);
  })
  .run(runConfig);
