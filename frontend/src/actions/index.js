import axios from 'axios';

const clientId = 'EI3GHFP5FIFERWKVR2SYXSTOO4BKYZV33CLRVCHSCCKZJ0DF';
const clientSecret = 'MG3Z0KQILIDDRIOCIWFMUDVF4QWL5C5RTVZDYS0SON5ZLAHF';
const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';
const ROOT_URL = 'http://localhost:5000'

export const getLocation = (data)=>{
	let qs = {
		client_id: clientId, 
		client_secret: clientSecret,
		query: data.query,
		limit: 4,
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
						console.log('RES PROMISES', res);
						// res.forEach((detail, index)=>{
						// 	venues[index] = detail.data.response.venue
						// });
						for (let i = 0; i < venues.length; i++) {
							if(res[i].data.response.venue.bestPhoto){
								venues[i].bestPhotoPrefix = res[i].data.response.venue.bestPhoto.prefix;
								venues[i].bestPhotoSuffix = res[i].data.response.venue.bestPhoto.suffix;
							}else{
								venues[i].bestPhotoPrefix = 'no-img';
								venues[i].bestPhotoSuffix = 'no-img';
							}
							venues[i].rating = res[i].data.response.venue.rating;
							venues[i].numOfRatings = res[i].data.response.venue.ratingSignals;
						}
						console.log('VENUE AFTER', venues);
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
		const menuItems = [];
		axios.get(`${detailURL}/${id}/menu`, {params: qs})
			.then(res => {
				const menu = res.data.response.menu.menus.items;
				if (menu) {
					const traverseMenu = (items) => {
						items.forEach(item => {
							if (item.entries) traverseMenu(item.entries.items);
							else menuItems.push({
								itemName: item.name, 
								itemPrice: item.price,
								itemId: item.entryId,
							});
						})
					}
					traverseMenu(menu);
					menuItems.venueId = id;
				}
			})
			.then(() => {
				axios.get(`${ROOT_URL}/venues`, { headers: { venueId: id }})
					.then(res => {
						console.log('res in getMenu is', res);
						const ratings = res.data;
						menuItems.forEach(item => {
							for (let i = 0; i < ratings.length; i++) {
								if (item.itemId === ratings[i].itemId) {
									item.rating = ratings[i].rating.reduce((t,n) => t+n) / ratings[i].rating.length;
									ratings.splice(i, 1);
								}
							}
						});
					})
					.then(() => {
						dispatch({
							type: 'FETCHED_MENU',
							payload: menuItems
						});
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