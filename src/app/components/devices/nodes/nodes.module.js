import angular from 'angular';

import {node} from './node/node.component';

import {NodesService} from './nodes.service';

angular
  .module('wsApp.devices.nodes', [])
  .component('node', node)
  .service('NodesService', NodesService);
