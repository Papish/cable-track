const template = require('./point-marker.html');

export const PointMarkerComponent = {
  bindings: {
    points: '<'
  },
  template,
  controller: class PointMarkerComponent {
    constructor($uibModal, $stateParams, PointService, toastr, Auth) {
      'ngInject';

      this.$uibModal = $uibModal;
      this.$stateParams = $stateParams;
      this.PointService = PointService;
      this.toastr = toastr;

      this.Auth = Auth;

      this.xhrOnUpdateProgress = false;
    }

    $onInit() {
      //
    }

    showDevice(pointId) {
      const modalInstance = this.$uibModal.open({
        component: 'pointDevices',
        resolve: {
          pointId() {
            return pointId;
          }
        },
        size: 'lg',
        backdrop: 'static'
      });

      modalInstance.result.then(() => {
        //
      }, () => {
        //
      });
    }

    doUpdate(event) {
      if (this.xhrOnUpdateProgress) {
        return;
      }

      this.xhrOnUpdateProgress = true;

      event.updated_by = this.Auth.getLoggedUser().id; // eslint-disable-line

      this.PointService.update(event)
        .then(() => {
          // this.toastr.info('Updated successfully', 'Point');
        })
        .finally(() => {
          this.xhrOnUpdateProgress = false;
        });
    }
  }
};

