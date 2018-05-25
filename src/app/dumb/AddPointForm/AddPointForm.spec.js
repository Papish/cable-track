// import angular from 'angular';
// import 'angular-mocks';
// import {AddPointForm} from './AddPointForm';

// describe('Add point form component', () => {
// 	beforeEach(() => {
// 		/** @ngInject */
// 		angular
// 			.module('AddPointForm', ['app/dumb/AddPointForm/AddPointForm.html'])
// 			.component('appAddPointForm', AddPointForm);
// 		angular.mock.module('AddPointForm');
// 	});

// 	it('should render as expected', angular.mock.inject(($rootScope, $compile) => {
// 		const $scope = $rootScope.$new();
// 		const element = $compile('<app-add-point-form></app-add-point-form>')($scope);
// 		$scope.$digest();
// 		const content = element.find('h4');
// 		expect(content.html().trim()).toEqual('Enter GPS Coordinate');
// 	}));
// });
