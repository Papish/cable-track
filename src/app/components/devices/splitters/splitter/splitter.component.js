'use strict';

class SplitterController {

  /** @ngInject */
  constructor($log, $window, Splitters, Auth, toastr) {
    this.$log = $log;
    this.$window = $window;
    this.Splitters = Splitters;
    this.Auth = Auth;
    this.toastr = toastr;

    this.edit = false;
    this.user = null;
  }

  $onInit() {
    this.user = this.Auth.getLoggedUser();

    this.device = {};

    this.Splitters.getAll()
      .then(data => {
        this.splitters = data;
      });
  }

  formSubmit() {
    if (this.edit === false && angular.isUndefined(this.device.id)) {
      this.device.created_by = this.user.id;    // eslint-disable-line

      this.Splitters.save(this.device)
        .then(data => {
          if (data.id) {
            this.toastr.success('New splitter added', 'Success');
            this.splitters.unshift(data);
            this.device = {};
          }
        });
    } else {
      this.device.updated_by = this.user.id;    // eslint-disable-line

      const index = this.splitters.findIndex(data => data.id === this.device.id);

      this.Splitters.update(this.device)
        .then(data => {
          this.toastr.success('Splitter data updated', 'Success');
          this.splitters[index] = data;
          this.edit = false;
          this.device = {};
        });
    }
  }

  deleteDevice(id, index) {
    const req = this.$window.confirm('Do you want to delete the device?');

    if (req) {
      this.Splitters.delete(id)
        .then(() => {
          this.toastr.success('Splitter deleted', 'Success');
          this.splitters.splice(index, 1);
          this.device = {};
        });
    }
  }

  editDevice(index) {
    this.edit = true;
    const data = this.splitters[index];

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

export const splitter = {
  template: require('./splitter.html'),
  controller: SplitterController
};
