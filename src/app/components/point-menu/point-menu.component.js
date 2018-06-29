const template = require('./point-menu.html');

export const PointMenuComponent = {
  template,
  controller: class PointMenuComponent {
    constructor(PointService, $state, $timeout, MapService, $rootScope) {
      'ngInject';

      this.PointService = PointService;
      this.$state = $state;
      this.$timeout = $timeout;
      this.MapService = MapService;

      this.$rootScope = $rootScope;
      this.point = true;
    }
    $onInit() {
      this.PointService.fetchAll()
        .then(points => {
          this.points = points;
        });
      this.PointService.points
        .subscribe(val => {
          if (val.data) {
            this.points.push(val.data);
          }
        });

      this.$rootScope.$on('SEARCH_ON', () => {
        this.point = true;
        // this.MapService.showDrawnMarkers();
      });
    }
    selected(point) {
      this.$rootScope.$broadcast('pointClick_' + point.id);
      this.$state.go('maps.dynamic', {
        center: point.latitude + ',' + point.longitude,
        dc: false // dc: dynamic center from config
      });
    }
    toggled() {
      this.$timeout(() => {
        if (this.point) {
          // this.MapService.showDrawnMarkers();
        } else {
          // this.MapService.hideDrawnMarkers();
        }
      }, 100);
    }
  }
};
