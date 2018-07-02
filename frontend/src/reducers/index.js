import { combineReducers } from 'redux';
import {
    VenueReducer,
} from './venue';

const rootReducer = combineReducers({
    venues: VenueReducer,
});

export default rootReducer;
