
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
	autoCompleteItems: [],
	searchLoading: false,
	searchItems: [],
	nearbyItems: [],
	nearbyLoading: false,
	menuLoading: false,
	menu: [],
	addingPhoto: false,
	itemLoading: true,
	viewItem: {place:{}, photos:[{}], reviews: [], totalRatings: null, loc: {coordinates: []}}
}

const ItemReducer = (state = initItem, action) => {
	switch (action.type) {
		case 'FETCHED_ITEMS':
			return {...state, allItems: action.payload}

		case 'GOT_MENU':
			return {...state, menu: action.payload, menuLoading: false}

		case 'GOT_ITEM':
			return {...state, viewItem: action.payload, itemLoading: false}

		case 'MENU_LOADING':
			return {...state, menuLoading: true}

		case 'ITEM_LOADING':
			return {...state, itemLoading: true}

		case 'NEARBY_LOADING':
			return {...state, nearbyLoading: true}

		case 'NEARBY_ITEMS':
			return {...state, nearbyItems: action.payload, nearbyLoading: false}

		case 'NEARBY_DISTANCE':
		const copyNearby = Object.assign([], state.nearbyItems);
			copyNearby.forEach((item, index)=>{
				item.distance = action.payload[index]
			});
			return {...state, nearbyItems: copyNearby}

		case 'SEARCH_LOADING':
			return {...state, searchLoading: true}

		case 'SEARCHED_ITEMS':
			return {...state, searchItems: action.payload, photoLoading: false, searchLoading: false}

		case 'UPDATED_ITEM':
			// const copyItems = Object.assign([], state.allItems);
			// const updatedItems = copyItems.map(item => {
			// 	if(item._id === action.payload._id){
			// 		return action.payload;
			// 	}
			// 	return item;
			// });
			return {...state, viewItem: action.payload, addingPhoto: false}


		default:
			return state;
	}
};


export { VenueReducer, ItemReducer}