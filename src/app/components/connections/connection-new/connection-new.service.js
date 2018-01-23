export default class ConnectionNewService {
  constructor($q, $http, baseUrl) {
    'ngInject';

    this.$q = $q;
    this.$http = $http;
    this.baseUrl = baseUrl;

    this.polyline = null;
  }

  getDevicePosition(id) {
    const deferred = this.$q.defer();

    this.$http.get(this.baseUrl + 'connections/point_device_position/' + id, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        deferred.resolve(response.data);
      }, err => {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  drawPolyline(map, data) {
    this.polyline = new google.maps.Polyline({
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1,
      strokeWeight: 1,
      editable: true
    });

    this.polyline.setMap(map);
    this.polyline.getPath().push({
      lat() {
        return parseFloat(data.latitude);
      },
      lng() {
        return parseFloat(data.longitude);
      }
    });
  }

  drawMap(map) {
    google.maps.event.addListener(map, 'click', event => {
      if (this.polyline === null) {
        return;
      }
      this.polyline.getPath().push(event.latLng);
    });
  }

  secondDraw(data) {
    this.polyline.getPath().push({
      lat() {
        return parseFloat(data.latitude);
      },
      lng() {
        return parseFloat(data.longitude);
      }
    });
  }

  stop() {
    if (this.polyline !== null) {
      this.polyline.setMap(null);
    }
  }

  saveConxn(data) {
    return this.$http.post(this.baseUrl + 'points/insert_connection', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        return response.data;
      });
  }
}
