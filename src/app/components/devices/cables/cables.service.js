export default class CableService {
  constructor($q, $http, baseUrl) {
    'ngInject';

    this.$q = $q;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }
  show() {
    const deferred = this.$q.defer();
    this.$http.get(this.baseUrl + 'cables/show')
      .then(response => {
        deferred.resolve(response.data);
      }, err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  create(data) {
    const deferred = this.$q.defer();
    this.$http.post(this.baseUrl + 'cables/insert', {
      name: data.name,
      description: data.description
    })
      .then(response => {
        deferred.resolve(response.data);
      }, err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  update(data) {
    const deferred = this.$q.defer();
    this.$http.post(this.baseUrl + 'cables/update', {
      id: data.id,
      name: data.name,
      description: data.description
    })
      .then(response => {
        deferred.resolve(response.data);
      }, err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
  delete(data) {
    const deferred = this.$q.defer();
    this.$http.post(this.baseUrl + 'cables/delete/' + data.id)
      .then(response => {
        deferred.resolve(response.data);
      }, err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }
}
