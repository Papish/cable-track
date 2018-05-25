/**
 * Action creators
 *
 * @type string
 */
export const ADD_NEW_POINT = '[Point] Add New Point';

// Action creators
export function addPoint(data) {
	return {
		type: ADD_NEW_POINT,
		payload: data
	};
}
