const template = require('./point-form.html');

export const PointFormComponent = {
  bindings: {
    point: '<',
    onDevice: '&',
    onUpdate: '&'
  },
  template,
  controller: class PointFormComponent {
    constructor($stateParams, PointService) {
      'ngInject';

      this.$stateParams = $stateParams;
      this.PointService = PointService;
    }

    $onInit() {
      this.dbPoint = this.point;
      this.PointService.getPointDetail(this.point.id)
        .then(data => {
          this.formPoint = {
            id: data.id,
            location: data.location,
            description: data.description
          };
        });

      const a = this.$stateParams.point_one;
      const b = this.$stateParams.point_two;

      if (angular.isUndefined(a) && angular.isUndefined(b)) {
        this.stage = 1;
      } else if (angular.isDefined(a) && angular.isUndefined(b)) {
        this.stage = 2;
      } else if (angular.isDefined(a) && angular.isDefined(b)) {
        this.stage = 0;
      }

      this.panel = 2;
    }

    showDevices(id) {
      this.onDevice({
        $event: id
      });
    }

    update() {
      this.changed = false;
      this.panel = 2;
      if (this.dbPoint.location.toLowerCase() !== this.formPoint.location.toLowerCase()) {
        this.changed = true;
      }
      if (this.dbPoint.description.toLowerCase() !== this.formPoint.description.toLowerCase()) {
        this.changed = true;
      }
      if (this.changed === true) {
        this.onUpdate({
          $event: this.formPoint
        });
      }
      this.dbPoint = Object.assign({}, this.formPoint);
    }
  }
};
