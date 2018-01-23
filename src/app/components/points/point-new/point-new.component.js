const template = require('./point-new.html');

export const PointNewComponent = {
  bindings: {
    newPoint: '<',
    points: '<',
    onDelete: '&',
    onSave: '&'
  },
  template,
  controller: class PointNewComponent {
    constructor() {
      'ngInject';
    }

    insertPoint() {
      this.onSave({
        $event: this.newPoint
      });
    }

    deletePoint() {
      this.onDelete();
    }
  }
};
