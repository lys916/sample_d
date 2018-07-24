
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
			// newVenue.forEach(venue=>{
			// 	if(venue.id === action.payload.venueId){
			// 		if(venue.menus){
			// 			venue.menu.forEach(menu=>{
			// 			if(menu.name === action.payload.name){
			// 				menu.push(averageRating);
			// 			}
			// 		});
			// 		}
					
			// 	}
			// });
			for (let i = 0; i < newVenue.length; i++) {
				if (newVenue[i].id === action.payload.venueId) {
					if (newVenue[i].menus) {
						for (let j = 0; j < newVenue[i].menus.length; j++) {
							if (newVenue[i].menus[j].itemId === action.payload.itemId) {
								newVenue[i].menus[j].rating = averageRating;
								break;
							}
						}
					} else console.log('found venue does not have a menu');
					break;
				}
			}
			console.log('newItem is', newVenue);
			console.log('averageRating', averageRating);
			return newVenue;
			
		default:
			return venues;
	}
};

const initItem = {
	allItems: [],
	nearbyItems: [],
	nearbyLoading: false,
	menuLoading: false,
	menu: []
}

const ItemReducer = (state = initItem, action) => {
	switch (action.type) {
		case 'FETCHED_ITEMS':
			return {...state, allItems: action.payload}

		case 'GOT_MENU':
			return {...state, menu: action.payload, menuLoading: false}

		case 'MENU_LOADING':
			return {...state, menuLoading: true}

		case 'NEARBY_LOADING':
			return {...state, nearbyLoading: true}

		case 'NEARBY_ITEMS':
			return {...state, nearbyItems: action.payload, nearbyLoading: false}

		default:
		return state;
	}
};


export { VenueReducer, ItemReducer}