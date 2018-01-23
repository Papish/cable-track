import angular from 'angular';

import {dashboard} from './dashboard.component';
import {DashboardPanelComponent} from './dashboard-panel/dashboard-panel.component';

import DashboardService from './dashboard.service';

angular
  .module('wsApp.dashboard', [])
  .component('dashboard', dashboard)
  .component('dashboardPanel', DashboardPanelComponent)
  .service('DashboardService', DashboardService);
