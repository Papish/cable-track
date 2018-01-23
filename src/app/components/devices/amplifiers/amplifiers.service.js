export class AmplifiersService {

  /** @ngInject */
  constructor($log, $http, baseUrl) {
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'amplifiers/get_amps')
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  save(data) {
    return this.$http.post(this.baseUrl + 'amplifiers/insert_amp', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  delete(id) {
    return this.$http.get(this.baseUrl + 'amplifiers/delete_amp/' + id)
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  update(data) {
    return this.$http.post(this.baseUrl + 'amplifiers/update_amp', data, {
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
