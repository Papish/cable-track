import {ADD_NEW_POINT} from './action';

const initialState = [];

// New app marker point reducer
export function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_NEW_POINT:
			return [].concat(action.payload);
		default:
			return state;
	}
}
