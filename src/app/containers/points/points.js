/** Map point service */
export default class MapPointService {
	/** @ngInject */
	constructor($http, AppUsersService) {
		this.$http = $http;
		this._appUsersService = AppUsersService;
	}

	save(postData) {
		if (!postData) {
			return
		}
	}
}
