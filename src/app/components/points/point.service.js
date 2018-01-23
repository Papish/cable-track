/**
 * Service for point http req, res
 *
 */
import Rx from 'rxjs';

export default class PointService {

  /** @ngInject */
  constructor($log, $http, baseUrl, $window, $q) {
    this.$log = $log;
    this.$http = $http;
    this.baseUrl = baseUrl;

    this.$window = $window;

    // Creating a new reactive subject instance
    this._point = new Rx.BehaviorSubject([]);
    this.points = this._point.asObservable();

    this.$q = $q;
  }

  fetchAll() {
    const deferred = this.$q.defer();

    this.$http.get(this.baseUrl + 'points/all_points')
      .then(response => {
        deferred.resolve(response.data);
      }, error => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  insert(data) {
    return this.$http.post(this.baseUrl + 'points/insert_point', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        const data = response.data;

        // Emit a new event on success, Rxjs emit event
        this._point.next({
          data
        });

        return data;
      }, error => {
        this.$log.error(error);
      });
  }

  getPointDetails(id) {
    return this.$http.get(this.baseUrl + 'points/point_device_lat_lng/' + id)
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  update(data) {
    return this.$http.post(this.baseUrl + 'points/update_point', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        const data = response.data;
        return data;
      }, error => {
        this.$log.error(error);
      });
  }

  // Point device methods
  getAllDevices(id) {
    return this.$http.get(this.baseUrl + 'points/all_point_devices/' + id)
      .then(response => {
        return response.data;
      }, error => {
        this.$log.error(error);
      });
  }

  savePointDevices(data) {
    return this.$http.post(this.baseUrl + 'points/insert_point_devices', data, {
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

  // Point connection
  saveConxn(data) {
    return this.$http.post(this.baseUrl + 'points/insert_connection', data, {
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

  getAllConxn() {
    return this.$http.get(this.baseUrl + 'points/get_connections')
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }

  getPointDetail(id) {
    return this.$http.get(this.baseUrl + 'points/get_point_details/' + id)
      .then(response => {
        return response.data;
      }, e => {
        this.$log.error(e);
      });
  }
}
