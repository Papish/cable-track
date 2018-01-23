import template from './cable-form.html';

export const cableForm = {
  bindings: {
    resolve: '<',
    dismiss: '&',
    close: '&'
  },
  template,
  controller: class CableForm {
    constructor() {
      'ngInject';
    }
    $onInit() {
      this.isNew = this.device = this.resolve.device;
    }
    onSubmit() {
      this.close({
        $value: this.device
      });
    }
    onDelete() {
      this.dismiss({
        $value: this.device
      });
    }
    $onDestroy() {
      //
    }
  }
};
