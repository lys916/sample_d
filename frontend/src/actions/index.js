import axios from 'axios';

const searchURL = 'foursquare api url';

export const getLocation = (data)=>{
	if(data.location){
		// search venues by city
		return (dispatch) => {
	      axios.get(`${searchURL}`).then(venues => {
	       	dispatch({
	       		type: 'FETCHED_VENUES',
	       		payload: venues
	       	});
      	});
    	}
	}else{
		// serach venues by lat and long
		return (dispatch) => {
	      axios.get(`${searchURL}`).then(venues => {
	       	dispatch({
	       		type: 'FETCHED_VENUES',
	       		payload: venues
	       	});
	      });
    	}
	}
	
}