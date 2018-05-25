import angular from 'angular';

/** @ngInject */
angular
  .module('wsApp.config', [])
  .constant('baseUrl', 'http://localhost/cable-track/api/');
  // .constant('baseUrl', 'http://rfsky.websurfer.com.np/sky-api/');
