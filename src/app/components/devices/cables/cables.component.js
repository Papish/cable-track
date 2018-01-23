import template from './cables.html';

class Cables {
  constructor($uibModal, CableService, toastr) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.CableService = CableService;

    this.toastr = toastr;
  }

  $onInit() {
    this.CableService.show()
      .then(data => {
        this.devices = data;
      });
  }

  onCreate() {
    const modal = this.$uibModal.open({
      component: 'cableForm'
    });

    modal.result.then(device => {
      this.CableService.create(device)
        .then(data => {
          if (!data) {
            return;
          }
          this.devices.push(data);
        });
    }, () => {
    });
  }

  onSelected(cable) {
    let _cable = null;

    if (!cable) {
      return;
    }

    _cable = angular.copy(cable);

    const modal = this.$uibModal.open({
      component: 'cableForm',
      resolve: {
        device() {
          return _cable;
        }
      }
    });

    modal.result.then(device => {
      if (!device) {
        return;
      }
      this._updateDevice(device);
    }, device => {
      if (!device || angular.isUndefined(device.id)) {
        return;
      }
      this._deleteDevice(device);
    });
  }

  _updateDevice(device) {
    this.CableService.update(device)
      .then(data => {
        if (!data) {
          return;
        }
        const index = this.devices.findIndex(device => device.id === data.id);
        this.devices[index] = data;
      });
  }

  _deleteDevice(data) {
    this.CableService.delete(data)
      .then(data => {
        if (data) {
          this.toastr.info('The device is in use', 'Cannot delete');
          return;
        }
        const index = this.devices.findIndex(device => device.id === data.id);
        this.devices.splice(index, 1);
      });
  }

  $onDestroy() {
  }
}

export const cables = {
  template,
  controller: Cables
};
