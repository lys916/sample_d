
import { } from '../actions/index';

const init = [{
	name: 'Cabalen Filipino Cuisine',
	rating: 4,
	id: 'dummy-id',
	location: {
		address: '1122 Western St',
		city: 'Fairfield',
		distance: 32
	}
},
{
	name: "Mini Burgers",
	rating: 4.5,
	id: 'dummy-id',
	location: {
		address: '1122 N Texas St',
		city: 'Fairfield',
		distance: 59
	}
}]

const VenueReducer = (venues = init, action) => {
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