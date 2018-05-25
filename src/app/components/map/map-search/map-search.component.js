import * as newPointActions from '../../../store/points/action';
const template = require('./map-search.html');

export const MapSearchComponent = {
  template,
  controller: class MapSearchComponent {
    constructor(MapService, PointService, $state, $rootScope, $ngRedux, $scope) {
      'ngInject';

      this.MapService = MapService;
      this.PointService = PointService;
      this.$state = $state;

      this.$rootScope = $rootScope;

      // Redux
      const unsubscribe = $ngRedux.connect(this.mapStateToThis, newPointActions)(this);
      $scope.$on('$destroy', unsubscribe);
    }

    $onInit() {
      this.PointService.fetchAll()
        .then(points => {
          this.points = points;
        });
    }

    search(keyword) {
      if(angular.isDefined(keyword) && keyword.indexOf(',') !== -1) {
        return;
      }

      return this.MapService.search(keyword)
        .then(data => {
          return data;
        });
    }

    searchGps() {
      // let x = '20';
      // x = parseFloat(x);
      // console.log(x);
      const gps = this.search.keyword;
      let gpsArray = {};

      if (gps.indexOf(',') !== -1) {
        // has comma seperated value
        gpsArray = gps.split(',');
      } else if (gps.indexOf(' ') !== -1) {
        // has space seperated value
        gpsArray = gps.split(' ');
      }

      if (gpsArray.length === 2) {
        gpsArray[0] = parseFloat(gpsArray[0]);
        gpsArray[1] = parseFloat(gpsArray[1]);

        if (!isNaN(gpsArray[0]) && !isNaN(gpsArray[1])) {
          const coords = {
            latitude: gpsArray[0],
            longitude: gpsArray[1]
          };

          // Redux action dispatcher
          // Action with entered co-ordinates
          this.addPoint(coords);
          this.search.keyword = '';

          this.$state.go('maps.dynamic', {
            center: coords.latitude + ',' + coords.longitude,
            dc: false
          }, {
            notify: false,
            reload: false
          });
        }
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

    mapStateToThis() {
      return {};
    }

    $onDestroy() {
      //
    }
  }
};
