import {combineReducers} from 'redux';
import {reducer as newPoint} from './points/reducer';

export const reducers = combineReducers({
	newPoint
});
