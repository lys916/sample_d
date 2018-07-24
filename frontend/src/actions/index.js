import axios from 'axios';

const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';
const ROOT_URL = 'http://localhost:5000'

export const getItems = (lat, lng) => {
	console.log('reaches in getItems action', lat, lng);
	return (dispatch) => {
		axios.get(`${ROOT_URL}`, { params: { lat, lng }})
			.then(items => {
				console.log('items in getItems action', items);
				dispatch({
					type: 'GET_ITEMS',
					payload: items.data
				});
			});
	}
}

export const setRating = (itemId, venueId, rated) => {
	return (dispatch) => {
		axios.post(`${ROOT_URL}`, { itemId, venueId, rated })
			.then(savedItem => {
				console.log('savedItem in setRating action', savedItem);
				dispatch({
					type: 'SET_ITEM_RATING',
					payload: savedItem.data
				});
			});
	}
}

export const addItem = (itemData, history) => {
	// sending dish/item data to server 'createItem' route
	return (dispatch) => {
		axios.post(`${ROOT_URL}/createItem`, itemData)
		.then(savedItem => {
			dispatch({
				type: 'SAVED_ITEM',
				payload: savedItem.data
			});
			alert('Thank you for leaving a review!');
			history.push('/');
		});
	}
}

export const searchNearby = (lat, long) => {
	return (dispatch) => {
		const config = {
			params: {lat: lat, long: long}
		}
		axios.get(`${ROOT_URL}/nearbyItems`, config)
			.then(items => {
				console.log('nearBy items', items);
				dispatch({
					type: 'NEARBY_ITEMS',
					payload: items.data
				});
			});
	}
}

// export const getLocation = (data)=>{
// 	let qs = {
// 		client_id: clientId, 
// 		client_secret: clientSecret,
// 		query: data.query,
// 		limit: 4,
// 		v: '20180702',
// 	};
// 	if (data.location) qs.near = data.location;
// 	else qs.ll = `${data.lat},${data.long}`;
// 	return (dispatch) => {
// 		axios.get(`${searchURL}`, {params: qs})
// 			.then(res => {
// 				const { venues } = res.data.response;
// 				const Promises = [];
// 				venues.forEach(venue => {
// 					Promises.push(axios.get(`${detailURL}/${venue.id}`, { params: qs }));
// 				});
// 				Promise.all(Promises)
// 					.then(res => {
// 						console.log('RES PROMISES', res);
// 						// res.forEach((detail, index)=>{
// 						// 	venues[index] = detail.data.response.venue
// 						// });
// 						for (let i = 0; i < venues.length; i++) {
// 							if(res[i].data.response.venue.bestPhoto){
// 								venues[i].bestPhotoPrefix = res[i].data.response.venue.bestPhoto.prefix;
// 								venues[i].bestPhotoSuffix = res[i].data.response.venue.bestPhoto.suffix;
// 							}else{
// 								venues[i].bestPhotoPrefix = 'no-img';
// 								venues[i].bestPhotoSuffix = 'no-img';
// 							}
// 							venues[i].rating = res[i].data.response.venue.rating;
// 							venues[i].numOfRatings = res[i].data.response.venue.ratingSignals;
// 						}
// 						console.log('VENUE AFTER', venues);
// 						dispatch({
// 							type: 'FETCHED_VENUES',
// 							payload: venues
// 						});
// 					})
// 			})
// 	}
// }

// export const getMenu = (id)=>{
// 	const qs = { 
//                 client_id: clientId, 
//                 client_secret: clientSecret,
//                 v: '20180702'
//             }
// 	return (dispatch) => {
// 		const menuItems = [];
// 		axios.get(`${detailURL}/${id}/menu`, {params: qs})
// 			.then(res => {
// 				const menu = res.data.response.menu.menus.items;
// 				if (menu) {
// 					const traverseMenu = (items) => {
// 						items.forEach(item => {
// 							if (item.entries) traverseMenu(item.entries.items);
// 							else menuItems.push({
// 								itemName: item.name, 
// 								itemPrice: item.price,
// 								itemId: item.entryId,
// 							});
// 						})
// 					}
// 					traverseMenu(menu);
// 					menuItems.venueId = id;
// 				}
// 			})
// 			.then(() => {
// 				axios.get(`${ROOT_URL}/venues`, { headers: { venueId: id }})
// 					.then(res => {
// 						console.log('res in getMenu is', res);
// 						const ratings = res.data;
// 						menuItems.forEach(item => {
// 							for (let i = 0; i < ratings.length; i++) {
// 								if (item.itemId === ratings[i].itemId) {
// 									item.rating = ratings[i].rating.reduce((t,n) => t+n) / ratings[i].rating.length;
// 									ratings.splice(i, 1);
// 								}
// 							}
// 						});
// 					})
// 					.then(() => {
// 						dispatch({
// 							type: 'FETCHED_MENU',
// 							payload: menuItems
// 						});
// 					});
// 			});
// 	}
// }
