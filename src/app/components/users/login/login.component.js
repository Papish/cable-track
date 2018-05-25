class LoginController {

  /** @ngInject */
  constructor($log, $state, Auth) {
    this.$log = $log;
    this.$state = $state;

    this.Auth = Auth;
    this.xhrOnLoad = false;
  }

  $onInit() {
    this.user = {
      email: '',
      password: ''
    };

    this.error = false;
  }

  validateAuth() {
    if (this.xhrOnLoad) {
      return;
    }

    this.xhrOnLoad = true;
    this.Auth.login(this.user)
      .then(data => {
        if (!data || angular.isUndefined(data.id)) {
          this.error = true;
          return;
        }
        this.Auth.setLoggedUser(data);
        this.$state.go('maps.dynamic');
      })
      .finally(() => {
        this.xhrOnLoad = false;
      });
  }
}

export const login = {
  template: require('./login.html'),
  controller: LoginController
};
