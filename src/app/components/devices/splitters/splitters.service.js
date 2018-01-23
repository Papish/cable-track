export class SplittersService {

  /** @ngInject */
  constructor($log, $http, baseUrl) {
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'splitters/get_splitters')
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  save(data) {
    return this.$http.post(this.baseUrl + 'splitters/insert_splitter', data, {
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
    return this.$http.get(this.baseUrl + 'splitters/delete_splitter/' + id)
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  update(data) {
    return this.$http.post(this.baseUrl + 'splitters/update_splitter', data, {
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
