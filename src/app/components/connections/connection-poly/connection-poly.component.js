export const connectionPoly = {
  bindings: {
    plot: '<'
  },
  controller: class ConnectionPoly {
    constructor(MapService, $element, $compile, $scope) {
      'ngInject';
      this.MapService = MapService;
      this.$element = $element;
      this.$compile = $compile;
      this.$scope = $scope;
    }

    $onInit() {
      this.MapService.getMap()
        .then(map => {
          this.drawPolyline(map);
        });
    }

    drawPolyline(map) {
      const path = google.maps.geometry.encoding.decodePath(this.plot);

      const decodedLevels = this.decodeLevels('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');

      this.poly = new google.maps.Polyline({
        levels: decodedLevels,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 1.5
      });

      this.info = null;
      this.poly.addListener('click', event => {
        if (this.info !== null) {
          this.info.close();
        }
        this.info = new google.maps.InfoWindow();
        this.info.setPosition(event.latLng);
        let template = this.$element.html();
        template = template.replace(/\s?ng-non-bindable[='"]+/, '');
        const content = this.$compile(template)(this.$scope.$parent)[0];
        this.info.setContent(content);
        this.info.open(map);
      });

      map.addListener('click', () => {
        return this.info ? this.info.close() : '';
      });

      map.addListener('click', () => {
        this.poly.setOptions({
          editable: false
        });
      });

      this.poly.setPath(path);
      this.poly.setMap(map);
    }

    decodeLevels(encodedLevelsString) {
      const decodedLevels = [];

      for (let i = 0; i < encodedLevelsString.length; ++i) {
        const level = encodedLevelsString.charCodeAt(i) - 63;
        decodedLevels.push(level);
      }

      return decodedLevels;
    }

    $onDestroy() {
      if (this.info !== null) {
        this.info.close();
      }
      this.poly.setMap(null);
    }
  }
};
