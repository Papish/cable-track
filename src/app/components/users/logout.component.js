export const logout = {
  controller: class Logout {
    constructor(Auth, $state) {
      'ngInject';

      this.Auth = Auth;
      this.$state = $state;

      sessionStorage.removeItem('USER.LOGGED');
      $state.go('login');
    }
  }
};
