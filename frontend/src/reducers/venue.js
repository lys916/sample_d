
import { } from '../actions/index';

const init = [{
	name: 'Cabalen Filipino Cuisine',
	rating: 4,
	location: {
		address: '1122 Western St',
		city: 'Fairfield',
		distance: 32
	}
},
{
	name: "Mini Burgers",
	rating: 4.5,
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

export { VenueReducer }