
import { } from '../actions/index';

const VenueReducer = (venues = [], action) => {
	switch (action.type) {

		case 'FETCHED_VENUES':
			return action.payload;

		default:
		return venues;
	}
};

const ItemReducer = (items = [], action) => {
	switch (action.type) {

		case 'FETCHED_ITEMS':
			return action.payload;

		default:
		return items;
	}
};


export { VenueReducer, ItemReducer}