const template = require('./map-search.html');

export const MapSearchComponent = {
  template,
  controller: class MapSearchComponent {
    constructor(MapService, PointService, $timeout, $state, $rootScope) {
      'ngInject';

      this.MapService = MapService;
      this.PointService = PointService;
      this.$timeout = $timeout;
      this.$state = $state;

      this.$rootScope = $rootScope;
    }

    $onInit() {
      this.PointService.fetchAll()
        .then(points => {
          this.points = points;
        });
    }

    search(keyword) {
      const word = keyword.replace(',', '');
      return this.MapService.search(word)
        .then(data => {
          return data;
        });
    }

    searchGps(event) {
      if (event.keyCode !== 13) {
        return;
      }

      if (/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(this.search.keyword)) {
        const gps = this.search.keyword.replace(' ', '').split(',');
        const lat = gps[0];
        const lng = gps[1];

        this.$state.go('maps.dynamic', {
          center: lat + ',' + lng,
          dc: false
        }, {
          notify: false,
          reload: false
        });

        this.search.keyword = '';
      }
    }

    searchMap(selected) {
      this.$state.go('maps.dynamic', {
        center: selected.lat + ',' + selected.lng,
        dc: false
      }, {
        notify: false,
        reload: false
      });

      this.$rootScope.$broadcast('SEARCH_ON');
      this.search.keyword = '';
    }

    $onDestroy() {
      //
    }
  }
};
