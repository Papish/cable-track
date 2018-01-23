class PointDevicesController {

  /** @ngInject */
  constructor($state, $stateParams, PointService, Auth, NodesService, Amplifiers, Splitters, Tapoffs, $timeout, $rootScope) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.PointService = PointService;
    this.NodesService = NodesService;
    this.Amplifiers = Amplifiers;
    this.Splitters = Splitters;
    this.Tapoffs = Tapoffs;
    this.Auth = Auth;
    this.$timeout = $timeout;

    this.devices = [];
    this.tab = 1;

    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.currentPage = 1;
    this.devicePerPage = 5;

    this.loading = 0;
    this.deviceOne = this.$stateParams.device_one;
    this.connectionStage = 0;

    if (this.$stateParams.device_one !== '') {
      this.connectionStage = 1;
    }

    this.deviceCategory = [
      {
        id: 1,
        name: 'Node'
      },
      {
        id: 2,
        name: 'Amplifier'
      },
      {
        id: 3,
        name: 'Splitter'
      },
      {
        id: 4,
        name: 'Tapoff'
      }
    ];

    this.PointService.getAllDevices(this.resolve.pointId)
      .then(data => {
        if (data !== null) {
          this.devices = data;
        }
      });
  }

  selectedCategory() {
    this.deviceLists = [];

    if (this.device.type === 1) {
      this.NodesService.getNodes()
        .then(data => {
          this.deviceLists = data;
        });
    } else if (this.device.type === 2) {
      this.Amplifiers.getAll()
        .then(data => {
          this.deviceLists = data;
        });
    } else if (this.device.type === 3) {
      this.Splitters.getAll()
        .then(data => {
          this.deviceLists = data;
        });
    } else if (this.device.type === 4) {
      this.Tapoffs.getAll()
        .then(data => {
          this.deviceLists = data;
        });
    }
  }

  addDevice() {
    const user = this.Auth.getLoggedUser();

    const formData = {
      point_id: this.resolve.pointId,               // eslint-disable-line
      device_id: this.device.id,                    // eslint-disable-line
      device_type: this.device.type,                // eslint-disable-line
      name: this.device.name,
      in_port: this.device.type === 1 ? 1 : 0,      // eslint-disable-line
      created_by: user.id,                          // eslint-disable-line
      updated_by: user.id                           // eslint-disable-line
    };

    this.PointService.savePointDevices(formData)
      .then(data => {
        if (data) {
          this.$onInit();
          this.device = {};
          this.$rootScope.$broadcast('NEW_DEVICE', data);
        }
      });
  }

  cancel() {
    this.dismiss({
      $value: 'cancel'
    });
  }
}

export const pointDevices = {
  bindings: {
    resolve: '<',
    dismiss: '&'
  },
  template: require('./point-devices.html'),
  controller: PointDevicesController
};
