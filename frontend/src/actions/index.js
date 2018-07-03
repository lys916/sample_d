import axios from 'axios';

const clientId = 'F5RTJTTG122SE1BHB0GE1OP2PACQLGBNUFPFAKT4HB2CR0OX';
const clientSecret = 'A0RLUDRE4GIA201TOUVE5KM0SYMTSPZD50XYOP1HNUX1DQV0';
const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';

export const getLocation = (data)=>{
	console.log('loca', data);
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
		console.log('request axio');
		axios.get(`${searchURL}`, {params: qs}).then(res => {
			const { venues } = res.data.response;
			venues.forEach(venue => {
				axios.get(`${detailURL}/${venue.id}`, { params: qs })
					.then(res => {
						venue.bestPhotoPrefix = res.data.response.venue.bestPhoto.prefix;
						venue.bestPhotoSuffix = res.data.response.venue.bestPhoto.suffix;
						venue.rating = res.data.response.venue.rating;
						venue.numOfRatings = res.data.response.venue.ratingSignals;
						console.log('venue details result is', res.data.response.venue)
					})
			})
			console.log(res.data.response.venues);
			dispatch({
				type: 'FETCHED_VENUES',
				payload: venues
			});
		});
	}
}

export const getVenueDetail = (id)=>{
	const qs = { 
            client_id: clientId, 
            client_secret: clientSecret,
            v: '20180702'
        }
	return (dispatch) => {
	      axios.get(`${detailURL}/${id}`, {params: qs}).then(res => {
	      	console.log('RES DETAIL', res);
	       	dispatch({
	       		type: 'FETCHED_DETAIL',
	       		payload: res
	       	});
	      });
    	}
}