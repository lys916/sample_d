import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';

class ItemInput extends React.Component {
    state = {
		lat: '',
		long: '',
    }

    componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude });
		  });
	  } else console.log("Geolocation is not supported by this browser");
	}
	
	handleAddItem = () => {
		const { lat, long } = this.state;
		const currentLocation = new window.google.maps.LatLng(lat, long);
		const map = new window.google.maps.Map(document.createElement('div'));
		const request = {
			location: currentLocation,
			type: ['restaurant'],
			query: 'restaurant'
		}
		const service = new window.google.maps.places.PlacesService(map);
		service.textSearch(request, (results, status) => {
		console.log('result is', results);
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				for (let i = 0; i < results.length; i++) {
					let place = results[i];
				}
			}  
		});
	}

	handleScriptCreate = () => this.setState({ scriptLoaded: false });
	handleScriptError = () => this.setState({ scriptError: true });
	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	render() {
		return (
			<div className="item-input-container">
				<Script
					url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
					onCreate={this.handleScriptCreate}
					onError={this.handleScriptError}
					onLoad={this.handleScriptLoad}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(ItemInput);