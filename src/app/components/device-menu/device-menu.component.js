const template = require('./device-menu.html');

export const DeviceMenuComponent = {
  bindings: {
    title: '@',
    onToggle: '&',
    onSelect: '&',
    deviceOf: '<'
  },
  template,
  controller: class DeviceMenuComponent {
    constructor(DeviceMenuService, $rootScope, $window) {
      'ngInject';

      this.DeviceMenuService = DeviceMenuService;
      this.$rootScope = $rootScope;

      this.$window = $window;
    }

    $onInit() {
      this.device = false;

      if (this.deviceOf.type === 1) {
        // Node
        this.DeviceMenuService.getNodes()
          .then(data => {
            this.devices = data;
          });
      } else if (this.deviceOf.type === 2) {
        this.DeviceMenuService.getAmps()
          .then(data => {
            this.devices = data;
          });
      } else if (this.deviceOf.type === 3) {
        this.DeviceMenuService.getSplitters()
          .then(data => {
            this.devices = data;
          });
      } else if (this.deviceOf.type === 4) {
        this.DeviceMenuService.getTapoffs()
          .then(data => {
            this.devices = data;
          });
      } else if (this.deviceOf.type === 5) {
        this.DeviceMenuService.getCables()
          .then(data => {
            this.devices = data;
            this.setDefaultCable(data);
          });
      }

      this.$rootScope.$on('NEW_DEVICE', (event, data) => {
        if(event) {
          if (this.deviceOf.type === parseInt(data.device_type)) {
            this.devices.push(data);
          }
        }
      });

      this.$rootScope.$on('ON_DEVICE_DELETE', (event, data) => {
        if (!this.devices) {
          return;
        }

        const index = this.devices.findIndex(device => device.id == data); // eslint-disable-line
        if (index !== -1) {
          this.devices.splice(index, 1);
        }
      });
    }

    setDefaultCable(data) {
      if (data.length > 0) {
        this.$window.cableId = data[0].id;
      }
    }

    /**
     * On user select of cable
     * The selected cable is set to default wire for connection
     *
     * @param device Object
     */
    selected(device) {
      if (this.deviceOf.type === 5) {
        this.selectId = device.id;
        this.$window.cableId = device.id;
      }
    }
  }
};
