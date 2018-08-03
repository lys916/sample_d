import { combineReducers } from 'redux';
import { VenueReducer, ItemReducer } from './venue';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
    venues: VenueReducer,
    items: ItemReducer,
    user: userReducer
});

export default rootReducer;
