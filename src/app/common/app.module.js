import angular from 'angular';

// import {ErrorMessageService} from './services/errorService';

// Navigation menu for dashboard view
import {EncryptStringFilter, firstLetterToCapital, toNumber} from './app.filter';

/** @ngInject */
angular
  .module('wsApp.common', [])
  // .service('ErrorMessageService', ErrorMessageService)
  .filter('EncryptString', EncryptStringFilter)
  .filter('firstLetterToCapital', firstLetterToCapital)
  .filter('toNumber', toNumber);
