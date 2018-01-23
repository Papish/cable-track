const template = require('./dashboard-panel.html');

export const DashboardPanelComponent = {
  template,
  controller: class DashboardPanelComponent {
    constructor(DashboardService) {
      'ngInject';
      this.DashboardService = DashboardService;
    }
    $onInit() {
      this.currentPage = 1;
      this.itemPerPage = 10;
      this.DashboardService.summary()
        .then(data => {
          this.summary = data;
        });

      this.DashboardService.logs()
        .then(data => {
          this.logs = data;
        });
    }
  }
};
