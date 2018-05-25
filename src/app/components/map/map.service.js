/* global OverlappingMarkerSpiderfier */
export default class MapService {

  /** @ngInject */
  constructor($q, $document, $timeout, $state, $http, baseUrl) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.$document = $document;
    this.$state = $state;

    this.infoWindow = null;

    this.$http = $http;
    this.baseUrl = baseUrl;
  }

  setMap(param) {
    const renderOn = param.renderOn;
    const mapOptions = param.mapOptions;

    this.map = new google.maps.Map(renderOn, {
      center: {
        lat: mapOptions.lat,
        lng: mapOptions.lng
      },
      zoom: mapOptions.zoom,
      disableDoubleClickZoom: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      fullscreenControl: false,
      streetViewControl: false,
      draggableCursor: 'default'
      // mapTypeId: 'satellite'
    });

    // Assign new property to map object above which holds markers array
    this.map.markers = [];

    const events = [
      'rightclick', 'click'
    ];

    for (let i = 0; i < events.length; i++) {
      google.maps.event.addListener(this.map, events[i], () => {
        if (this.infoWindow !== null) {
          this.infoWindow.close();
        }
      });
    }

    // refactor this using rxjs queuing process, it has some bug in UX
    google.maps.event.addListener(this.map, 'dragend', () => {
      this.$timeout(() => {
        this.$state.go(this.$state.current.name, {
          center: this.map.getCenter().lat().toFixed(6) + ',' + this.map.getCenter().lng().toFixed(6),
          dc: true // dynamic center,
        }, {
          notify: false,
          reload: false
        });
      }, 10);
    });

    // Google map spifier third party lib
    this.oms = new OverlappingMarkerSpiderfier(this.map, {
      markersWontMove: true,     // we promise not to move any markers, allowing optimizations
      markersWontHide: true,     // we promise not to change visibility of any markers, allowing optimizations
      basicFormatEvents: false,  // allow the library to skip calculating advanced formatting information
      circleFootSeparation: 40,
      // circleStartAngle: (23 / 7) / 9,
      keepSpiderfied: false,
      legWeight: 1
    });

    this.oms.addListener('spiderfy', () => {
      if (this.infoWindow !== null) {
        this.infoWindow.close();
      }
    });
  }

  getMap() {
    const x = this.$q.defer();
    x.resolve(this.map);
    return x.promise;
  }

  openInfoWindow(param) {
    if (this.infoWindow !== null) {
      this.infoWindow.close();
    }

    this.infoWindow = new google.maps.InfoWindow({
      closeBoxURL: ''
    });
    this.infoWindow.setContent(param.content);
    this.infoWindow.open(this.map, param.marker);
  }

  locationWiseSearch(param) {
    if (!param.search) {
      return;
    }

    const searchBox = new google.maps.places.SearchBox(param.search);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(param.search);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach(place => {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      this.map.fitBounds(bounds);
    });
  }

  cordinatesWiseSearch(param) {
    if (!param) {
      return;
    }

    const geocode = param.latLng;

    if (!geocode) {
      return;
    }

    const geocodeStr = geocode.split(', ');
    this.dynamicLat = parseFloat(geocodeStr[0]);
    this.dynamicLng = parseFloat(geocodeStr[1]);
  }

  changeCenter() {
    if (angular.isUndefined(this.dynamicLat)) {
      return;
    }
    this.map.panTo({
      lat: this.dynamicLat,
      lng: this.dynamicLng
    });
    this.map.setZoom(18);
  }

  search(keyword) {
    return this.$http.get(this.baseUrl + '/search/index/' + keyword, {
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

  pushMarkerToArray(marker) {
    this.map.markers.push(marker);
  }
}
