import axios from 'axios';

const searchURL = 'https://api.foursquare.com/v2/venues/search';
const detailURL = 'https://api.foursquare.com/v2/venues';
const clientId = 'EI3GHFP5FIFERWKVR2SYXSTOO4BKYZV33CLRVCHSCCKZJ0DF';
const clientSecret = 'MG3Z0KQILIDDRIOCIWFMUDVF4QWL5C5RTVZDYS0SON5ZLAHF';

export const getLocation = (data)=>{
	console.log('loca', data);
	if(data.location){
		// search venues by city
		const qs = { 
			client_id: clientId, 
			client_secret: clientSecret,
			near: data.location, 
			v: '20180702',
			venuePhotos: 1
		}
		return (dispatch) => {
			console.log('request axio');
	      axios.get(`${searchURL}`, {params: qs}).then(res => {
	      	console.log(res.data.response.venues);
	       	dispatch({
	       		type: 'FETCHED_VENUES',
	       		payload: res.data.response.venues
	       	});
      	});
    	}
	}else{
		// serach venues by lat and long
		const qs = { 
			client_id: clientId, 
			client_secret: clientSecret,
			ll: `${data.lat},${data.long}`, 
			v: '20180702',
			venuePhotos: 1
		}
		console.log('qs', qs);
		return (dispatch) => {
	      axios.get(`${searchURL}`, {params: qs}).then(res => {
	      	console.log(res.data.response.venues);
	       	dispatch({
	       		type: 'FETCHED_VENUES',
	       		payload: res.data.response.venues
	       	});
	      });
    	}
	}	
}

export const getVenueDetail = (id)=>{
	return (dispatch) => {
	      axios.get(`${detailURL}`, {params: {VENUE_ID: id}}).then(res => {
	      	console.log('RES DETAIL', res);
	       	dispatch({
	       		type: 'FETCHED_DETAIL',
	       		payload: res
	       	});
	      });
    	}
}