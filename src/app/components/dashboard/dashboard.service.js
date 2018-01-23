export default class DashboardService {
  constructor($log, $http, baseUrl) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  summary() {
    return this.$http.get(this.baseUrl + 'dashboard/summary', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, err => {
        this.$log.error(err);
      });
  }

  logs() {
    return this.$http.get(this.baseUrl + 'logs/get_all', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, err => {
        this.$log.error(err);
      });
  }
}
