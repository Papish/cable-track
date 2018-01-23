/** @ngInject */
function runConfig($rootScope, $timeout, $location, $state, $stateParams, $uibModalStack, Auth, MapService, $http) {
  $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  // $http.defaults.cache = true;
  $rootScope.$on('$locationChangeStart', event => { // eslint-disable-line
    // Authentication run config options
    // Validates users
    const loginUrl = '/login';
    const isUserLogged = Auth.isUserLogged();

    if ($location.path() === loginUrl) {
      if (isUserLogged) {
        $location.path('/maps');
      }
    }

    if ($location.path() !== loginUrl) {
      if (!isUserLogged) {
        $location.path('/login');
      }
    }

    // Close all open modal when route change
    $uibModalStack.dismissAll();

    // close any open google marker info window on route change
    if ($stateParams.dc === 'false') {
      if (MapService.infoWindow !== null) {
        MapService.infoWindow.close();
      }
    }

    $timeout(() => {
      const dc = $stateParams.dc;
      const center = $stateParams.center;

      if (angular.isDefined(center)) {
        if (dc === 'true') {
          event.preventDefault();
          return;
        }
        const centerArr = center.split(',');

        MapService.getMap()
          .then(map => {
            map.panTo({
              lat: parseFloat(centerArr[0]),
              lng: parseFloat(centerArr[1])
            });
          });
      }
    }, 15);

    // if ($stateParams.dc === 'false') {
    //   toastr.clear();
    // }
  });

  $rootScope.$on('$locationChangeSuccess', () => { // eslint-disable-line
    if (angular.isDefined($stateParams.device_one)) {
      if (MapService.infoWindow !== null) {
        MapService.infoWindow.close();
      }
    }
  });
}

export default runConfig;
