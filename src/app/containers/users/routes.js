export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider) {
	$stateProvider
		.state('app-login', {
			url: '/app/login',
			component: 'appLogin'
		});
}
