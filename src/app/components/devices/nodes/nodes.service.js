export class NodesService {

  /** @ngInject */
  constructor($log, $http, baseUrl) {
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getNodes() {
    return this.$http.get(this.baseUrl + 'nodes/get_nodes')
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  save(data) {
    return this.$http.post(this.baseUrl + 'nodes/insert_node', data, {
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
    return this.$http.get(this.baseUrl + 'nodes/delete_node/' + id)
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  update(data) {
    return this.$http.post(this.baseUrl + 'nodes/update_node', data, {
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
