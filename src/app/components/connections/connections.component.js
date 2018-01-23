const template = require('./connections.html');

export const connections = {
  template,
  controller: class Connections {
    constructor(MapService, ConnectionsService, $rootScope, $window, Auth) {
      'ngInject';

      this.ConnectionsService = ConnectionsService;
      this.MapService = MapService;

      this.$rootScope = $rootScope;
      this.$window = $window;

      this.Auth = Auth;
    }
    $onInit() {
      this.ConnectionsService.getAll()
        .then(data => {
          this.connections = data;
        });

      this.$rootScope.$on('NEW_CONXN', (event, data) => {
        if (event) {
          this.connections.push(data);
        }
      });

      this.$rootScope.$on('DELETE_CONXN', (event, data) => {
        if (event) {
          // data is an array
          angular.forEach(data, conxn => {
            const index = this.connections.findIndex(conn => conn.id == conxn.id); // eslint-disable-line
            if (index !== -1) {
              this.connections.splice(index, 1);
            }
          });
        }
      });
    }

    deleteConnection(id) {
      const req = this.$window.confirm('Do you want to delete the connection');

      if (!req) {
        return;
      }

      const userId = this.Auth.getLoggedUser().id;
      this.ConnectionsService.deleteConxn(id, userId)
        .then(data => {
          if (!data) {
            return;
          }
          const index = this.connections.findIndex(conn => conn.id == id); // eslint-disable-line
          if (index !== -1) {
            this.connections.splice(index, 1);
          }
        });
    }
  }
};
