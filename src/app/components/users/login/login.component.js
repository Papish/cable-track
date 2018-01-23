class LoginController {

  /** @ngInject */
  constructor($log, $state, Auth) {
    this.$log = $log;
    this.$state = $state;

    this.Auth = Auth;
  }

  $onInit() {
    this.user = {
      email: '',
      password: ''
    };

    this.error = false;
  }

  validateAuth() {
    this.Auth.login(this.user)
      .then(data => {
        if (!data || angular.isUndefined(data.id)) {
          this.error = true;
          return;
        }
        this.Auth.setLoggedUser(data);
        this.$state.go('maps.dynamic');
      });
  }
}

export const login = {
  template: require('./login.html'),
  controller: LoginController
};
