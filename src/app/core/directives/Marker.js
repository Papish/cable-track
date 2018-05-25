/** @ngInject */
export const googleMarker = (
	$compile,
	$window,
	MapService,
	MarkerManager
) => {
	'ngInject';
	return {
		restrict: 'E',
		require: ['^map'],
		scope: {
			latitude: '<',
			longitude: '<',
			isActive: '<',
			iconUrl: '@',
			title: '@',
			onClick: '&',
			onDrag: '&'
		},
		link(scope, element) {
			element.css('display', 'none');
			const _google = $window.google;
			const position = new _google.maps.LatLng(
				scope.latitude,
				scope.longitude
			);
			const _marker = new _google.maps.Marker();
			_marker.setPosition(position);
			const _content = $compile(
				element.html()
			)(
				scope.$parent
			)[0];
			const _infoWindow = new google.maps.InfoWindow();
			_infoWindow.setContent(_content);
			MapService.getMap().then(gmap => {
				_marker.addListener('click', () => {
					MarkerManager.updateInfoWindow(_infoWindow);
					_infoWindow.open(gmap, _marker);
					scope.$apply();
				});
				_marker.setMap(gmap);
				scope.marker = _marker;
			});
		},
		controller($scope) {
			'ngInject';
			this.$onDestroy = () => {
				$scope.marker.setMap(null);
			};
		}
	};
};
