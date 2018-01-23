const template = require('./user-form.html');

export const UserFormComponent = {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template,
  controller: class UserFormComponent {
    constructor() {
      'ngInject';
    }
    $onInit() {
      this.new = !this.resolve.user;
      this.user = this.resolve.user;
    }
    onSubmit() {
      this.close({
        $value: this.user
      });
    }
  }
};
