export const dashboard = {
  template: require('./dashboard.html'),
  controller: class DashboardComponent {
    constructor(Auth) {
      'ngInject';
      this.Auth = Auth;
    }
    $onInit() {
      const user = this.Auth.getLoggedUser();
      this.user = user.password;
    }
  }
};
