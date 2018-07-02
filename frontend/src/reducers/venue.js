
import { } from '../actions/index';

const VenueReducer = (state = [], action) => {
	switch (action.type) {

		case 'FETCHED_VENUES':
			return action.payload;

		default:
		return state;
	}
};

export { VenueReducer }