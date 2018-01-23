import angular from 'angular';

import {cables} from './cables.component';
import CableService from './cables.service';

import {cableForm} from './cable-form/cable-form';

angular
  .module('cable', [])
  .component('cables', cables)
  .service('CableService', CableService)
  .component('cableForm', cableForm);
