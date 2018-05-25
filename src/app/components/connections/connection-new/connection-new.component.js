export const ConnectionNewComponent = {
  controller: class ConnectionNewComponent {
    constructor($stateParams, ConnectionNewService, MapService, $state, $rootScope, $window, toastr, Auth) {
      'ngInject';

      this.$stateParams = $stateParams;
      this.ConnectionNewService = ConnectionNewService;
      this.MapService = MapService;
      this.$state = $state;

      this.$rootScope = $rootScope;
      this.$window = $window;
      this.toastr = toastr;

      this.Auth = Auth;
      this.xhrOnSaveProgress = false;
    }

    $onInit() {
      this.deviceOne = this.$stateParams.device_one;
      this.deviceTwo = this.$stateParams.device_two;

      if (angular.isDefined(this.deviceOne) && angular.isUndefined(this.deviceTwo)) {
        this.stageOne();
      } else if (angular.isDefined(this.deviceOne) && angular.isDefined(this.deviceTwo)) {
        this.stageTwo();
      }
    }

    stageOne() {
      // check if cable is created before starting connection
      if (angular.isUndefined(this.$window.cableId)) {
        // here a bug, route change not retaining url params
        this.$state.go('maps.dynamic', {
          notify: false,
          reload: true
        });
        // this.toastr.info('Create a cable to start connection', 'No cable found');
        return;
      }

      const id = this.$stateParams.device_one;

      this.ConnectionNewService.getDevicePosition(id)
        .then(data => {
          if (!data) {
            this.$state.go('maps.dynamic', {
              reload: true
            });
            this.toastr.info('Please reload and try again', 'Error', {
              timeOut: 3000,
              extendedTimeOut: 3000
            });
            return;
          }

          const that = this;
          this.toastr.info('Click on map to draw a plotline', 'New Connection', {
            timeOut: 0,
            extendedTimeOut: 0,
            onHidden() {
              that.$state.go('maps.dynamic', {
                notify: false,
                reload: true
              });
            }
          });

          this.MapService.getMap()
            .then(map => {
              this.ConnectionNewService.drawPolyline(map, data);
              this.ConnectionNewService.drawMap(map);
            });
        });
    }

    stageTwo() {
      const id = this.$stateParams.device_two;

      this.ConnectionNewService.getDevicePosition(id)
        .then(data => {
          if (!this.ConnectionNewService.polyline) {
            this.$state.go('maps.dynamic');
            return;
          }
          this.ConnectionNewService.secondDraw(data);

          const drawnPath = this.ConnectionNewService.polyline.getPath();
          const geoPath = google.maps.geometry.encoding.encodePath(drawnPath);
          if (angular.isDefined(geoPath) && geoPath !== null) {
            const x = google.maps.geometry.spherical.computeLength(drawnPath.getArray());
            const data = {
              point_device_one_id: this.deviceOne, // eslint-disable-line
              point_device_two_id: this.deviceTwo, // eslint-disable-line
              plot: geoPath,
              cable_id: this.$window.cableId, // eslint-disable-line
              user_id: this.Auth.getLoggedUser().id, // eslint-disable-line
              distance: Math.trunc(x)
            };

            if (this.xhrOnSaveProgress) {
              return;
            }

            this.xhrOnSaveProgress = true;
            this.ConnectionNewService.saveConxn(data)
              .then(data => {
                if (data) {
                  this.ConnectionNewService.stop();
                  this.$rootScope.$broadcast('NEW_CONXN', data);
                  // this.$state.reload('maps.dynamic', {
                  //   reload: false
                  // });
                  this.toastr.clear();
                  this.toastr.info('New connection added', 'Success');
                }
                this.xhrOnSaveProgress = false;
              })
              .finally(() => {
                this.xhrOnSaveProgress = false;
              });
          }
        });
    }

    $onDestroy() {
      if (this.$state.current.name === 'maps.dynamic') {
        if (this.ConnectionNewService.polyline !== null) {
          this.ConnectionNewService.stop();
        }
      }
    }
  }
};
