export class TapoffsService {

  /** @ngInject */
  constructor($log, $http, baseUrl) {
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'tapoffs/get_tapoffs')
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  save(data) {
    return this.$http.post(this.baseUrl + 'tapoffs/insert_tapoff', data, {
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
    return this.$http.get(this.baseUrl + 'tapoffs/delete_tapoff/' + id)
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  update(data) {
    return this.$http.post(this.baseUrl + 'tapoffs/update_tapoff', data, {
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
