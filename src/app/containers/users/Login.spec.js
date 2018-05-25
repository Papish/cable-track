// import angular from 'angular';
// import 'angular-mocks';
// import {Login} from './Login';

// describe('Login component', () => {
// 	beforeEach(() => {
// 		/** @ngInject */
// 		angular
// 			.module('loginComponent', ['app/containers/users/Login.html'])
// 			.component('loginComponent', Login);
// 		angular.mock.module('loginComponent');
// 	});

// 	const user = {
// 		username: '',
// 		password: ''
// 	};

// 	it('should render correctly', angular.mock.inject(($rootScope, $compile) => {
// 		const $scope = $rootScope.$new();
// 		const element = $compile('<login-component></login-component>')($scope);
// 		$scope.$digest();
// 		const childComponent = element.find('app-login-form');
// 		expect(childComponent[0]).not.toBeUndefined();
// 	}));

// 	it('should have input binding initialized', angular.mock.inject($componentController => {
// 		const component = $componentController('loginComponent', {}, user);
// 		// Expect to be object with two keys
// 		expect(Object.keys(component.user).length).toEqual(2);
// 		// Expect oject keys to match mock user
// 		expect(component.user).toEqual(user);
// 	}));
// });
