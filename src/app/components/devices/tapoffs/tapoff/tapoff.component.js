'use strict';

class TapoffController {

  /** @ngInject */
  constructor($log, $window, Tapoffs, Auth, toastr) {
    this.$log = $log;
    this.$window = $window;
    this.Tapoffs = Tapoffs;
    this.Auth = Auth;
    this.toastr = toastr;

    this.edit = false;
    this.user = null;
  }

  $onInit() {
    this.user = this.Auth.getLoggedUser();

    this.device = {};

    this.Tapoffs.getAll()
      .then(data => {
        this.tapoffs = data;
      });
  }

  formSubmit() {
    if (this.edit === false && angular.isUndefined(this.device.id)) {
      this.device.created_by = this.user.id;    // eslint-disable-line

      this.Tapoffs.save(this.device)
        .then(data => {
          if (data.id) {
            this.toastr.success('New tapoff added', 'Success');
            this.tapoffs.unshift(data);
            this.device = {};
          }
        });
    } else {
      this.device.updated_by = this.user.id;    // eslint-disable-line

      const index = this.tapoffs.findIndex(data => data.id === this.device.id);

      this.Tapoffs.update(this.device)
        .then(data => {
          this.toastr.success('Tapoff data updated', 'Success');
          this.tapoffs[index] = data;
          this.edit = false;
          this.device = {};
        });
    }
  }

  deleteDevice(id, index) {
    const req = this.$window.confirm('Do you want to delete the device?');

    if (req) {
      this.Tapoffs.delete(id)
        .then(() => {
          this.toastr.success('Tapoff deleted', 'Success');
          this.tapoffs.splice(index, 1);
          this.device = {};
        });
    }
  }

  editDevice(index) {
    this.edit = true;
    const data = this.tapoffs[index];

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

export const tapoff = {
  template: require('./tapoff.html'),
  controller: TapoffController
};
