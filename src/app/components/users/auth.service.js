export class AuthService {

  /** @ngInject */
  constructor($http, baseUrl) {
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  login(data) {
    return this.$http.post(this.baseUrl + 'users/auth/attempt_validation', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        return e;
      });
  }

  setLoggedUser(data) {
    if (angular.isDefined(data)) {
      sessionStorage.setItem('USER.LOGGED', angular.toJson(data));
    }
  }

  getLoggedUser() {
    return angular.fromJson(sessionStorage.getItem('USER.LOGGED'));
  }

  isUserLogged() {
    const user = sessionStorage.getItem('USER.LOGGED');
    if (user) {
      return true;
    }

    return false;
  }
}
