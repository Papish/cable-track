export default class DeviceMarkerService {
  constructor($log, $q, $http, baseUrl) {
    'ngInject';
    this.$log = $log;
    this.$q = this.$q;
    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  getAll() {
    return this.$http.get(this.baseUrl + 'devices/index', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }

  deleteDevice(data) {
    return this.$http.post(this.baseUrl + 'devices/delete', {
      id: data.id,
      user_id: data.user_id // eslint-disable-line
    }, {
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
  update(data) {
    return this.$http.post(this.baseUrl + 'devices/update', data, {
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

  getDeviceDetail(id) {
    return this.$http.post(this.baseUrl + 'devices/get_device_detail/' + id, {
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
