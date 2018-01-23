export default class ConnectionsService {
  constructor($http, baseUrl) {
    'ngInject';
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'points/get_connections', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  deleteConxn(id, userId) {
    return this.$http.post(this.baseUrl + 'connections/delete_connection', {
      id, userId
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, err => {
        return err;
      });
  }
}
