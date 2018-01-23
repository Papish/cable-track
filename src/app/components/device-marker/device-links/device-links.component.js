const template = require('./device-links.html');

export const DeviceLinksComponent = {
  bindings: {
    device: '<',
    edit: '=',
    onEdit: '&'
  },
  template,
  controller: class DeviceLinksComponent {
    constructor($stateParams, MapService, $window, DeviceMarkerService, $rootScope, Auth) {
      'ngInject';

      this.$stateParams = $stateParams;
      this.MapService = MapService;
      this.$window = $window;

      this.DeviceMarkerService = DeviceMarkerService;
      this.$rootScope = $rootScope;

      this.Auth = Auth;
    }
    $onInit() {
      const one = this.$stateParams.device_one;
      const two = this.$stateParams.device_two;

      if (angular.isUndefined(one) && angular.isUndefined(two)) {
        this.stage = 1;
      } else {
        this.stage = 2;
      }
      this.edit = false;
    }
    deleteMarker(id) {
      const req = this.$window.confirm('Do you want to delete the device and its connection');
      if (req) {
        const data = {
          id,
          user_id: this.Auth.getLoggedUser().id // eslint-disable-line
        };
        this.DeviceMarkerService.deleteDevice(data)
          .then(data => {
            if (data) {
              this.removeMarker(id);
              this.removeDeviceFromSideMenu(id);
              this.deleteConnection(data);
            }
          });
      }
    }
    removeMarker(id) {
      this.MapService.getMap()
        .then(map => {
          angular.forEach(map.markers, marker => {
            if (marker.id === id.toString()) {
              marker.setMap(null);
              return;
            }
          });
        });
    }
    editDevice() {
      this.edit = true;
    }
    saveDevice(name, id) {
      this.edit = false;
      this.onEdit({
        $event: {
          name,
          id
        }
      });
    }
    removeDeviceFromSideMenu(id) {
      this.$rootScope.$broadcast('ON_DEVICE_DELETE', id);
    }
    deleteConnection(data) {
      this.$rootScope.$broadcast('DELETE_CONXN', data);
    }
  }
};
