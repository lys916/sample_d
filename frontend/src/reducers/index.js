import { combineReducers } from 'redux';
import {
    VenueReducer,
    ItemReducer
} from './venue';

const rootReducer = combineReducers({
    venues: VenueReducer,
    items: ItemReducer
});

export default rootReducer;
