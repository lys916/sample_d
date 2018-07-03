
import { } from '../actions/index';

const VenueReducer = (venues = [], action) => {
	switch (action.type) {

		case 'FETCHED_VENUES':
			return action.payload;

		case 'FETCHED_MENU':
		console.log('REDUCE MENU', action.payload);
			const copyVenues = [...venues];
			copyVenues.forEach(venue=>{
				if(venue.id === action.payload.venueId){
						venue.menus = action.payload;
				}
			});
			return copyVenues;

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