import point from './point.png';
import node from './node.png';
import amp from './amp.png';
import splitter from './splitter.png';
import tapoff from './tapoff.png';

export const MapMarkerComponent = {
  bindings: {
    id: '<',
    marker: '<',
    lat: '<',
    lng: '<',
    infoWindow: '<',
    type: '<',
    draggable: '<',
    pointId: '<'
  },
  controller: class MapMarkerComponent {
    constructor($element, $compile, $scope, MapService, MapMarkerService, $state, $rootScope) {
      'ngInject';

      this.$element = $element;
      this.$compile = $compile;
      this.$scope = $scope;
      this.MapService = MapService;

      this.icon = null;

      this.MapMarkerService = MapMarkerService;
      this.$state = $state;
      this.$rootScope = $rootScope;
    }

    $onInit() {
      this.MapService.getMap()
        .then(map => {
          if(this.marker) {
            this.setInfoWindow();
          } else {
            this.createMarker(map);
            this.setInfoWindow();
          }
        });
    }

    markerIcon() {
      switch (this.type) {
        case '1':
          this.icon = node;
          break;
        case '2':
          this.icon = amp;
          break;
        case '3':
          this.icon = splitter;
          break;
        case '4':
          this.icon = tapoff;
          break;
        default:
          this.icon = point;
      }
    }

    createMarker() {
      this.markerIcon();
      this.marker = new google.maps.Marker({
        position: {
          lat: parseFloat(this.lat),
          lng: parseFloat(this.lng)
        },
        icon: this.icon,
        id: this.id
      });

      // this.marker.type = this.type;
      this.MapService.oms.addMarker(this.marker);

      if (angular.isUndefined(this.type)) {
        this.marker.setZIndex(1000);
      }

      this.MapService.pushMarkerToArray(this.marker);

      // this.marker.addListener('click', event => {
      //   this.$state.go('maps.dynamic', {
      //     center: event.latLng.lat() + ',' + event.latLng.lng(),
      //     dc: false // dc: dynamic center from config
      //   });
      // });
    }

    getTemp(template) {
      let render = null;
      const scope = this.$scope.$parent;
      if(!template) {
        return;
      }
      render = template.replace(/\s?ng-non-bindable[='"]+/, '');
      return this.$compile(render)(scope)[0];
    }

    setInfoWindow() {
      if (this.draggable === true) {
        this.marker.setOptions({
          draggable: true
        });

        this.marker.addListener('dragend', () => {
          if (this.MapService.infoWindow !== null) {
            this.MapService.infoWindow.close();
          }
        });
      }

      this.optInfoWindow();

      this.marker.addListener('spider_click', () => {
        this.marker.setZIndex(this.MapMarkerService.MAX_ZINDEX++);

        this.MapService.openInfoWindow({
          marker: this.marker,
          content: this.getTemp(this.$element.html())
        });
        this.$scope.$apply();
      }, {
        passive: true
      });

      if (angular.isDefined(this.pointId)) {
        this.$rootScope.$on(`pointClick_${this.pointId}`, () => {
          this.MapService.openInfoWindow({
            marker: this.marker,
            content: this.getTemp(this.$element.html())
          });
        });
      }
    }

    optInfoWindow() {
      if (!this.infoWindow) {
        return;
      }
      this.MapService.openInfoWindow({
        content: this.getTemp(this.$element.html()),
        marker: this.marker
      });
    }

    $onDestroy() {
      this.marker.setMap(null);
    }
  }
};
