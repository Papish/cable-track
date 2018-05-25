export const deviceMarkerCont = {
	template: require('./device-marker-cont.html'),
	bindings: {
		data: '<'
	},
	controller: class DeviceMarkerContController {
		/** @ngInject */
		constructor(DeviceMarkerService) {
			this.DeviceMarkerService = DeviceMarkerService;
		}

		$onInit() {
			this.DeviceMarkerService.getDeviceDetail(this.data.id).then(data => {
				this.device = data;
			});
		}
	}
};
