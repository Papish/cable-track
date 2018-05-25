export default class MarkerManagerService {
	/** @ngInject */
	constructor() {
		this.activeInfoWindow = null;
	}

	updateInfoWindow(infoWindow) {
		if (this.activeInfoWindow !== null) {
			this.activeInfoWindow.close();
			this.activeInfoWindow = null;
		}
		this.activeInfoWindow = infoWindow;
	}
}
