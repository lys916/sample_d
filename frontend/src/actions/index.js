import axios from 'axios';

const clientId = 'NDNEYEROXSCL3EKPBHENE4B3ODNATMPCLVH51ECG5K4JQAEA';
const clientSecret = 'YJZSFIZSBZ24GSVTIMSRCE31BR15XQP1DR1TIHIYGXXQS5TN';
const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';
const ROOT_URL = 'http://localhost:5000'

export const getLocation = (data)=>{
	let qs = {
		client_id: clientId, 
		client_secret: clientSecret,
		query: data.query,
		limit: 5,
		v: '20180702',
	};
	if (data.location) qs.near = data.location;
	else qs.ll = `${data.lat},${data.long}`;
	return (dispatch) => {
		axios.get(`${searchURL}`, {params: qs})
			.then(res => {
				const { venues } = res.data.response;
				const Promises = [];
				venues.forEach(venue => {
					Promises.push(axios.get(`${detailURL}/${venue.id}`, { params: qs }));
				});
				Promise.all(Promises)
					.then(res => {
						for (let i = 0; i < venues.length; i++) {
							venues[i].bestPhotoPrefix = res[i].data.response.venue.bestPhoto.prefix;
							venues[i].bestPhotoSuffix = res[i].data.response.venue.bestPhoto.suffix;
							venues[i].rating = res[i].data.response.venue.rating;
							venues[i].numOfRatings = res[i].data.response.venue.ratingSignals;
						}
						dispatch({
							type: 'FETCHED_VENUES',
							payload: venues
						});
					})
			})
	}
}

export const getMenu = (id)=>{
	const qs = { 
                client_id: clientId, 
                client_secret: clientSecret,
                v: '20180702'
            }
	return (dispatch) => {
		axios.get(`${detailURL}/${id}/menu`, {params: qs})
			.then(res => {
				const menu = res.data.response.menu.menus.items;
				const menuItems = [];
				if (menu) {
					const traverseMenu = (items) => {
						items.forEach(item => {
							if (item.entries) traverseMenu(item.entries.items);
							menuItems.push([item.name, item.price]);
						})
					}
					traverseMenu(menu);
					menuItems.venueId = id;
				}
				dispatch({
					type: 'FETCHED_MENU',
					payload: menuItems
				});
			})
	}
}

export const setRating = (name, venue, rating) => {
	return (dispatch) => {
		axios.post(`${ROOT_URL}`, { name, venue, rating })
			.then(savedItem => {
				dispatch({
					type: 'SET_ITEM_RATING',
					payload: savedItem.data
				});
			});
	}
}