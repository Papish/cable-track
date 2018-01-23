'use strict';

class NodeController {

  /** @ngInject */
  constructor($log, $window, NodesService, Auth, toastr) {
    this.$log = $log;
    this.$window = $window;
    this.NodesService = NodesService;
    this.Auth = Auth;
    this.toastr = toastr;

    this.edit = false;
    this.user = null;
  }

  $onInit() {
    this.user = this.Auth.getLoggedUser();

    this.device = {};

    this.NodesService.getNodes()
      .then(data => {
        this.nodes = data;
      });
  }

  formSubmit() {
    if (this.edit === false && angular.isUndefined(this.device.id)) {
      this.device.created_by = this.user.id;    // eslint-disable-line

      this.NodesService.save(this.device)
        .then(data => {
          this.toastr.success('New node added', 'Success');
          this.nodes.unshift(data);
          this.device = {};
        });
    } else {
      this.device.updated_by = this.user.id;    // eslint-disable-line

      const index = this.nodes.findIndex(data => data.id === this.device.id);

      this.NodesService.update(this.device)
        .then(data => {
          this.toastr.success('Node data updated', 'Success');
          this.nodes[index] = data;
          this.edit = false;
          this.device = {};
        });
    }
  }

  deleteDevice(id, index) {
    const req = this.$window.confirm('Do you want to delete the device?');

    if (req) {
      this.NodesService.delete(id)
        .then(data => {
          if (data.delete === 'true') {
            this.toastr.success('Node deleted', 'Success');
            this.nodes.splice(index, 1);
            this.device = {};
          } else {
            this.toastr.error('The device is currently at use', 'Delete failed');
          }
        });
    }
  }

  editDevice(index) {
    this.edit = true;
    const editNode = this.nodes[index];

    if (editNode) {
      this.device = {
        model_no: editNode.model_no,    // eslint-disable-line
        port: Number(editNode.port),
        description: editNode.description,
        id: editNode.id
      };
    }
  }
}

export const node = {
  template: require('./node.html'),
  controller: NodeController
};
