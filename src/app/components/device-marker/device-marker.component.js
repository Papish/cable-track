const template = require('./device-marker.html');

export const DeviceMarkerComponent = {
  template,
  controller: class DeviceMarkerComponent {
    constructor(DeviceMarkerService, $rootScope, Auth) {
      'ngInject';

      this.DeviceMarkerService = DeviceMarkerService;
      this.$rootScope = $rootScope;
      this.Auth = Auth;
    }
    $onInit() {
      this.DeviceMarkerService.getAll()
        .then(data => {
          this.devices = data;
        });
      this.$rootScope.$on('NEW_DEVICE', (event, data) => {
        event.preventDefault();
        this.devices.push(data);
      });
      this.edit = false;
    }
    onEdit(device) {
      device.updated_by = this.Auth.getLoggedUser().id; // eslint-disable-line
      this.DeviceMarkerService.update(device);
    }
  }
};
