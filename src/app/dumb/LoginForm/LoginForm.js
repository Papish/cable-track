class LoginFormController {
	doSubmit(event) {
		if (event) {
			event.preventDefault();
		}
		this.onSubmit({
			$data: this.user
		});
	}
}

export const LoginForm = {
	template: require('./LoginForm.html'),
	controller: LoginFormController,
	bindings: {
		user: '<',
		onSubmit: '&'
	}
};
