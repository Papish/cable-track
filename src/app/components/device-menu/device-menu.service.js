/* constant baseUrl */
export default class DeviceMenuService {
  constructor($q, $http, baseUrl) {
    'ngInject';

    this.$q = $q;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getNodes() {
    return this.$http.get(this.baseUrl + 'devices/nodes', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  getAmps() {
    return this.$http.get(this.baseUrl + 'devices/amplifiers', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  getSplitters() {
    return this.$http.get(this.baseUrl + 'devices/splitters', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  getTapoffs() {
    return this.$http.get(this.baseUrl + 'devices/tapoffs', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  getCables() {
    return this.$http.get(this.baseUrl + 'devices/cables', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }
}
