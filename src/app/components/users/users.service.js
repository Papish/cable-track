export default class UsersService {
  constructor($log, $http, baseUrl) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'users/auth/fetch_all', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  save(data) {
    return this.$http.post(this.baseUrl + 'users/auth/insert', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }
  update(data) {
    return this.$http.post(this.baseUrl + 'users/auth/update', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }
  updateEmail(data) {
    return this.$http.post(this.baseUrl + 'users/auth/update_email', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }
  updatePassword(data) {
    return this.$http.post(this.baseUrl + 'users/auth/update_password', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }
}
