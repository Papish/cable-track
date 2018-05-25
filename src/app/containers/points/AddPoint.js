class AddPointController {
	/** @ngInject */
	constructor(PointService, AppUsersService, $ngRedux) {
		this.PointService = PointService;
		this.AppUsersService = AppUsersService;

		$ngRedux.subscribe(() => {
			const state = $ngRedux.getState();
			this.markers = state.newPoint;
		});

		this.reset();
		this.xhrOnProgress = false;
		this.user = this.AppUsersService.getLoggedUserId();
	}

	save(data) {
		if (this.xhrOnProgress) {
			return;
		}

		this.xhrOnProgress = true;

		const postData = {
			latitude: this.markers[0].latitude,
			longitude: this.markers[0].longitude,
			location: data.location,
			description: data.description,
			created_by: this.user, // eslint-disable-line
			updated_by: this.user  // eslint-disable-line
		};

		this.PointService.insert(postData)
			.then(() => {
				this.reset();
				this.markers = [];
			})
			.finally(() => {
				this.xhrOnProgress = false;
			});
	}

	clear() {
		this.markers = [];
		this.reset();
	}

	reset() {
		this.point = {
			location: '',
			description: ''
		};
	}

	$destroy() {
		this.markers = [];
	}
}

export const AddPoint = {
	template: require('./AddPoint.html'),
	controller: AddPointController
};
