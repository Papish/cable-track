const template = require('./points.html');

export const PointsComponent = {
  template,
  controller: class PointsComponent {
    constructor($document, $timeout, MapService, PointService, Auth) {
      'ngInject';

      this.$document = $document;
      this.$timeout = $timeout;
      this.PointService = PointService;
      this.MapService = MapService;

      this.Auth = Auth;
      this.xhrSaveOnProgress = false;
    }

    $onInit() {
      this.markers = [];

      this.MapService.getMap()
        .then(map => {
          this.drawingTool(map);
          this.placeOnMap();
          this.points();
        });
    }

    points() {
      this.PointService.fetchAll()
        .then(points => {
          this.points = points;
        });

      // Subscribing to RxJS observable
      this.PointService.points
        .subscribe(val => {
          if (val.data) {
            this.points.push(val.data);
          }
        });
    }

    drawingTool(map) {
      const tool = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          drawingModes: ['marker', 'polyline']
        }
      });
      tool.setMap(map);
      this.eventHandler(tool);
    }

    eventHandler(tool) {
      google.maps.event.addListener(tool, 'markercomplete', marker => {
        this.$timeout(() => {
          tool.setDrawingMode(null);

          this.newPoint = {
            latitude: '',
            longitude: '',
            location: '',
            description: ''
          };

          marker.setOptions({
            raiseOnDrag: false,
            draggable: false
          });

          if (this.markers.length > 0) {
            this.markers = [];
          }
          this.markers.push(marker);
        });
      });
    }

    placeOnMap() {
      let set = false;
      const obs = new MutationObserver(() => {
        const dom = this.$document[0].querySelectorAll('[title="Stop drawing"]');
        if (set) {
          return;
        }
        if (angular.isDefined(dom[0])) {
          dom[0].parentElement.parentElement.className = 'gmnoprint drawingTool';
          set = true;
        }
      });

      obs.observe(this.$document[0], {
        childList: true,
        subtree: true
      });
    }

    savePoint(event) {
      if (this.xhrSaveOnProgress) {
        return;
      }

      this.xhrSaveOnProgress = true;

      if (!event) {
        return;
      }

      event.created_by = this.Auth.getLoggedUser().id; // eslint-disable-line
      event.updated_by = this.Auth.getLoggedUser().id; // eslint-disable-line

      this.PointService.insert(event)
        .then(point => {
          this.points.unshift(point);
          this.newPoint = {
            latitude: '',
            longitude: '',
            location: '',
            description: ''
          };
          this.markers = [];
        })
        .finally(() => {
          this.xhrSaveOnProgress = false;
        });
    }

    deletePoint() {
      this.markers = [];
    }
  }
};
