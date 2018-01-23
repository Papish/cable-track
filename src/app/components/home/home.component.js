class HomeController {

  /** @ngInject */
  constructor($timeout, $state) {
    this.$state = $state;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.$timeout(() => {
      this.loader = 1;
    }, 500);

    this.$timeout(() => {
      this.loader = 2;
    }, 1000);

    this.$timeout(() => {
      this.loader = 3;
    }, 1500);

    this.$timeout(() => {
      this.loader = 4;
    }, 2000);

    this.$timeout(() => {
      this.foo = true;
    }, 3000);
  }
}

export const home = {
  template: require('./home.html'),
  controller: HomeController
};
