/**
 * User service class
 *
 */
export class UsersService {
	/** @ngInject */
	constructor($window, $http) {
		this.$window = $window;
		this.$http = $http;
	}

	/**
	 * User active session control
	 */
	getLoggedUserId() {
		const user = angular.fromJson(
			sessionStorage.getItem('USER.LOGGED')
		);

		if (angular.isDefined(user)) {
			return user.id;
		}
	}
}
