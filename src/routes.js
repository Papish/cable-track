export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, toastrConfig) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/maps');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    // User auth routes
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('dashboard', {
      url: '/dashboard',
      component: 'dashboard'
    })
    .state('dashboard.panel', {
      url: '/panel',
      component: 'dashboardPanel'
    })
    .state('dashboard.devices', {
      url: '/devices',
      component: 'devices'
    })
    .state('dashboard.users', {
      url: '/users',
      component: 'users'
    })
    /* Device routes */
    .state('nodes', {
      url: '/devices/nodes',
      component: 'node'
    })
    /* Map routes */
    .state('maps', {
      url: '/maps',
      component: 'map'
    })
    /**
     * the reload option is turned off
     */
    .state('maps.dynamic', {
      url: '/?:center:dc',
      template: '<ui-view></ui-view>',
      // this is to ensure to load controller once on start
      // every static child component/controller are also loaded once except dynamic
      reloadOnSearch: false
    })
    .state('maps.dynamic.connection', {
      url: 'new+connection?:device_one:device_two',
      component: 'connectionNew'
    })
    .state('logout', {
      url: '/logout',
      component: 'logout'
    });

  // Toastr
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 3,
    newestOnTop: true,
    positionClass: 'toast-bottom-center',
    preventDuplicates: false,
    preventOpenDuplicates: true,
    target: 'body',
    allowHtml: true,
    closeButton: true,
    timeOut: 5000,
    extendedTimeOut: 0,
    tapToDismiss: false
  });
}
