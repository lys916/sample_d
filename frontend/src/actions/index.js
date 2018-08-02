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

export const addDistance = (distances, items) => {

	if(items === 'nearby'){
		return({
			type: 'ADD_NEARBY_DISTANCE',
			payload: distances
		});
	}

		if(items === 'results'){
		return({
			type: 'ADD_RESULTS_DISTANCE',
			payload:distances
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
	// if user includes a photo then we'll save the photo to
	// aws first then we'll save the item info to db.
	// else we just save the item info to db
	if(itemData.imageBlob){
		const data = new FormData();
		data.append('file', itemData.imageBlob);
		// sending dish/item data to server 'createItem' route
		return (dispatch) => {
			axios.post(`${ROOT_URL}/uploadPhoto`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(imageUrl => {
				itemData.imageUrl = imageUrl.data.url;
				axios.post(`${ROOT_URL}/createItem`, itemData)
				.then(savedItem => {
					dispatch({
						type: 'SAVED_ITEM',
						payload: savedItem.data
					});
					alert('Thank you for leaving a review!');
					history.push('/');
				});

			})
		}
	} else {
		// add item without photo
	    return (dispatch) => {
	   		itemData.imageUrl = null;
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
}

export const addPhoto = (itemData, history) => {
	console.log('adding photo', itemData);
	// if user includes a photo then we'll save the photo to
	// aws first then we'll save the item info to db.
	// else we just save the item info to db
	if(itemData.imageBlob){
		const data = new FormData();
		data.append('file', itemData.imageBlob);
		// sending dish/item data to server 'createItem' route
		
		return (dispatch) => {
			dispatch({type: 'ADDING_PHOTO'});
			axios.post(`${ROOT_URL}/uploadPhoto`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(imageUrl => {
				itemData.imageUrl = imageUrl.data.url;
				axios.put(`${ROOT_URL}/addPhoto`, itemData)
				.then(updatedItem => {
					console.log('ADDED PHOTO', updatedItem.data);
					dispatch({
						type: 'UPDATED_ITEM',
						payload: updatedItem.data
					});
				});

			})
		}
	}
}

export const addRating = (itemData, history) => {
	// if user includes a photo then we'll save the photo to
	// aws first then we'll save the item rating info to db.
	// else we just save the item rating info to db
	if (itemData.imageBlob) {
		const data = new FormData();
		data.append('file', itemData.imageBlob);
		// sending dish/item data to server 'addRating' route
		return (dispatch) => {
			axios.post(`${ROOT_URL}/uploadPhoto`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(imageUrl => {
				console.log('come into the addRating dispatch', imageUrl);
				// sending dish/item data to server 'addRating' route
				itemData.imageUrl = imageUrl.data.url;
				axios.post(`${ROOT_URL}/addRating`, itemData)
				.then(savedItem => {
					dispatch({
						type: 'SAVED_ITEM',
						payload: savedItem.data
					});
					alert('Thank you for leaving a review!');
					history.push('/');
				});
			})
		}
	} else {
		// sending dish/item data to server 'createItem' route
		return (dispatch) => {
			axios.post(`${ROOT_URL}/addRating`, itemData)
			.then(savedItem => {
				dispatch({
					type: 'UPDATED_ITEM',
					payload: savedItem.data
				});
					if(itemData.fromRoute === 'viewItem'){
						history.push(`/items/${itemData.itemId}`);
					}else{
						alert('Thank you for leaving a review!');
						history.push('/');
					}
			});
		}
	}
}
      // console.log('DRIV state', state);
      // props.nearbyItems.forEach((item, index)=>{
      //    // this.getItemDistance(item.place.geometry.location.lat, item.place.geometry.location.lng, index)
      // });

export const searchNearby = (lat, long) => {
	console.log('fetching near by items');
	return (dispatch) => {
		const config = {
			params: {lat: lat, long: long}
		}
		dispatch({type: 'NEARBY_LOADING'});
		axios.get(`${ROOT_URL}/nearbyItems`, config)
			.then(items => {
				console.log('return nearby items', items);
				dispatch({
					type: 'NEARBY_ITEMS',
					payload: items.data
				});

				const promises = [];
				// getting distance for each nearby item
				items.data.forEach((item, index)=>{
            	const origin = new window.google.maps.LatLng(lat, long);
      			const destination = new window.google.maps.LatLng(item.place.geometry.location.lat, item.place.geometry.location.lng);

      			var service = new window.google.maps.DistanceMatrixService();

      			const promise = new Promise(function(resolve, reject){
         			service.getDistanceMatrix({
          				origins: [origin],
          				destinations: [destination],
          				travelMode: 'DRIVING',
        					}, (response, status)=>{
            				if(status === 'OK'){
               				resolve(Number(response.rows[0].elements[0].distance.text.split(' ')[0]));
            				}else{
               				resolve('n/a');
            				}
        				});
      			});

      			promises.push(promise);
      			if(items.data.length === index+1){
         			Promise.all(promises).then(distances=>{
         				dispatch({
								type: 'NEARBY_DISTANCE',
								payload: distances
							});
         			});
      			}
				});
		});
	}
}

export const searchItems = (searchData) => {
	return (dispatch) => {
		const config = {
			params: searchData
		}
		dispatch({type: 'SEARCH_LOADING'});
		axios.get(`${ROOT_URL}/searchItems`, config)
			.then(items => {
				console.log('SEARCHED ITEMS', items.data);
				dispatch({
					type: 'SEARCHED_ITEMS',
					payload: items.data
				});
			});
	}
}

export const fetchMenu = (id) => {
	console.log('action id', id);
	return (dispatch) => {
		dispatch({type: 'MENU_LOADING'});
		axios.get(`${ROOT_URL}/fetchMenu`, { params: {id} })
			.then(items => {
				console.log('menu items', items);
				dispatch({
					type: 'GOT_MENU',
					payload: items.data
				});
			});
	}
}

export const getItem = (id) => {
	console.log('ID GET ITEM', id);
	return (dispatch) => {
		dispatch({type: 'ITEM_LOADING'});
		axios.get(`${ROOT_URL}/item`, {params: {id}})
			.then(item => {
				dispatch({
					type: 'GOT_ITEM',
					payload: item.data
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
