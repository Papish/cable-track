// CONSTANT to store all map markers
export const MapMarkerComponent = {
  bindings: {
    id: '<',
    marker: '<',
    lat: '<',
    lng: '<',
    infoWindow: '<',
    type: '<',
    draggable: '<'
  },
  controller: class MapMarkerComponent {
    constructor($element, $compile, $scope, MapService, MapMarkerService) {
      'ngInject';

      this.$element = $element;
      this.$compile = $compile;
      this.$scope = $scope;
      this.MapService = MapService;

      this.icon = null;

      this.MapMarkerService = MapMarkerService;
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
          this.icon = '../../img/node.png';
          break;
        case '2':
          this.icon = '../../img/amp.png';
          break;
        case '3':
          this.icon = '../../img/splitter.png';
          break;
        case '4':
          this.icon = '../../img/tapoff.png';
          break;
        default:
          this.icon = '../../img/point.png';
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
