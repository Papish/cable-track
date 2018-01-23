import angular from 'angular';

import 'angular-resource';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-toastr';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';

import ngInfiniteScroll from 'ng-infinite-scroll';

import './constant';
import './index.scss';

import './app/app.module';

import routesConfig from './routes';
import runConfig from './config';

import 'rx-angular';

/** @ngInject */
angular
  .module('wsApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngMaterial',
    'wsApp.config',
    'wsApp.app',
    'toastr',
    'rx',
    ngInfiniteScroll
  ])
  .config(routesConfig)
  .run(runConfig);
