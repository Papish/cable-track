const template = require('./map-sidebar.html');

export const MapSidebarComponent = {
  template,
  controller: class MapSidebarComponent {
    constructor($state) {
      'ngInject';
      this.$state = $state;
    }

    $onInit() {
    }

    dashboard() {
      this.$state.go('dashboard.panel');
    }
  }
};
