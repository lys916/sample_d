import axios from 'axios';

const clientId = 'F5RTJTTG122SE1BHB0GE1OP2PACQLGBNUFPFAKT4HB2CR0OX';
const clientSecret = 'A0RLUDRE4GIA201TOUVE5KM0SYMTSPZD50XYOP1HNUX1DQV0';
const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';

export const getLocation = (data)=>{
	let qs = {
		client_id: clientId, 
		client_secret: clientSecret,
		query: data.query,
		limit: 1,
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

// export const getVenueDetail = (id)=>{
// 	const qs = { 
//             client_id: clientId, 
//             client_secret: clientSecret,
//             v: '20180702'
//         }
// 	return (dispatch) => {
// 	      axios.get(`${detailURL}/${id}`, {params: qs}).then(res => {
// 	      	console.log('RES DETAIL', res);
// 	       	dispatch({
// 	       		type: 'FETCHED_DETAIL',
// 	       		payload: res.data.response.venue
// 	       	});
// 	      });
//     	}
// }