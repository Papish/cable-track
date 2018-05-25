/**
 * MapComponent
 *
 * Render google map v3 api
 * @type {Object}
 */

import template from './map.html';

export const MapComponent = {
  template,
  controller: class MapComponent {
    constructor($state, $document, MapService) {
      'ngInject';

      this.$state = $state;
      this.$document = $document;
      this.MapService = MapService;

      this.search = '';
      this.markers = [];
    }

    $onInit() {
      const mapOptions = {
        lat: 27.685665,
        lng: 85.346066,
        zoom: 17
      };

      this.MapService.setMap({
        renderOn: this.$document[0].getElementById('google-map'),
        mapOptions
      });

      this.$state.go(this.$state.current.name, {
        dc: false
      });
    }

    foo() {
      console.log('omg');
    }

    $onDestroy() {
      //
    }
  }
};
