class LoginController {
	/** @ngInject */
	constructor() {
		this.user = {
			username: '',
			password: ''
		};
	}

	validateUser(data) {
		if (data) {
			// Call validation service
		}
	}
}

export const Login = {
	template: require('./Login.html'),
	controller: LoginController
};
