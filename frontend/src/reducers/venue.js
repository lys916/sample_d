
import { } from '../actions/index';

const VenueReducer = (venues = [], action) => {
	switch (action.type) {

		case 'FETCHED_VENUES':
			return action.payload;

		case 'FETCHED_MENU':
			const copyVenues = [...venues];
			copyVenues.forEach(venue=>{
				if(venue.id === action.payload.venueId){
					venue.menus = action.payload;
				}
			});
			return copyVenues;

		case 'SET_ITEM_RATING':
				console.log('rating from action', action.payload);

			const averageRating = action.payload.rating.reduce((t, n) => t + n) / action.payload.rating.length;
			const newVenue = [...venues];
			newVenue.forEach(venue=>{
				if(venue.id === action.payload.venueId){
					if(venue.menue){
						venue.menu.forEach(menu=>{
						if(menu.name === action.payload.name){
							menu.push(averageRating);
						}
					});
					}
					
				}
			});
			// for (let j = 0; j < newVenue.length; j++) {
			// 	if (newVenue[j].id === action.payload.venueId) {
			// 		for (let i = 0; i < newVenue[j].menu.length; i++) {
			// 			if (newVenue[j].menu[i].name === action.payload.name) {
			// 				newVenue[j].menu[i].push(averageRating);
			// 				break;
			// 			}
			// 		}
			// 		break;
			// 	}
			// }
			console.log('newItem is', newVenue);
			console.log('averageRating', averageRating);
			return newVenue;
			
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