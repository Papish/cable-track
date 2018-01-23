'use strict';

class AmplifierController {

  /** @ngInject */
  constructor($log, $window, Amplifiers, Auth, toastr) {
    this.$log = $log;
    this.$window = $window;
    this.Amplifiers = Amplifiers;
    this.Auth = Auth;
    this.toastr = toastr;

    this.edit = false;
    this.user = null;
  }

  $onInit() {
    this.user = this.Auth.getLoggedUser();

    this.device = {};

    this.Amplifiers.getAll()
      .then(data => {
        this.amplifiers = data;
      });
  }

  formSubmit() {
    if (this.edit === false && angular.isUndefined(this.device.id)) {
      this.device.created_by = this.user.id;    // eslint-disable-line

      this.Amplifiers.save(this.device)
        .then(data => {
          if (data.id) {
            this.toastr.success('New amplifier added', 'Success');
            this.amplifiers.unshift(data);
            this.device = {};
          }
        });
    } else {
      this.device.updated_by = this.user.id;    // eslint-disable-line

      const index = this.amplifiers.findIndex(data => data.id === this.device.id);

      this.Amplifiers.update(this.device)
        .then(data => {
          this.toastr.success('Amplifier data updated', 'Success');
          this.amplifiers[index] = data;
          this.edit = false;
          this.device = {};
        });
    }
  }

  deleteDevice(id, index) {
    const req = this.$window.confirm('Do you want to delete the device?');

    if (req) {
      this.Amplifiers.delete(id)
        .then(data => {
          if (data) {
            this.toastr.info('The device is in use', 'Delete failed');
            return;
          }
          this.toastr.success('Amplifier deleted', 'Success');
          this.amplifiers.splice(index, 1);
          this.device = {};
        });
    }
  }

  editDevice(index) {
    this.edit = true;
    const data = this.amplifiers[index];

    if (data) {
      this.device = {
        model_no: data.model_no,    // eslint-disable-line
        port: Number(data.port),
        description: data.description,
        id: data.id
      };
    }
  }
}

export const amplifier = {
  template: require('./amplifier.html'),
  controller: AmplifierController
};
