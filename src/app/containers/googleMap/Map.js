class MapController {
	/** @ngInject */
	constructor(MapService) {
		this._mapService = MapService;
	}
}

export const Map = {
	template: require('./Map.html'),
	controller: MapController
};
