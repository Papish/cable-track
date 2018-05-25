import angular from 'angular';

import {connections} from './connections.component';
import ConnectionsService from './connections.service';

import {connectionPoly} from './connection-poly/connection-poly.component';

import {ConnectionNewComponent} from './connection-new/connection-new.component';
import ConnectionNewService from './connection-new/connection-new.service';

angular
  .module('connections', [])
  .component('connectionNew', ConnectionNewComponent)
  .component('connections', connections)
  .component('connectionPoly', connectionPoly)
  .service('ConnectionNewService', ConnectionNewService)
  .service('ConnectionsService', ConnectionsService);
