import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';
import { addItem } from '../actions';

class ItemInput extends React.Component {
    state = {
		lat: '',
		long: '',
		location: {},
		name: '',
		tags: [],
		rating: '',
		review: '',
		price: '',
		imageURL: ''
    }

    componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude });
		  });
	  } else console.log("Geolocation is not supported by this browser");
	  this.handleAddItem();
	}
	
	handleAddItem = () => {
				// const theWindow = new Window();
		const { lat, long } = this.state;
		const currentLocation = new google.maps.LatLng(lat, long);
		const map = new google.maps.Map(document.createElement('div'));
		console.log('SDFLKSJDF', currentLocation, map);
		const request = {
			location: currentLocation,
			type: ['restaurant'],
			query: 'restaurant'
		}

		// const service = new window.google.maps.places.PlacesService(map);
		// service.textSearch(request, (results, status) => {
		// console.log('result is', results);
		// 	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
		// 		for (let i = 0; i < results.length; i++) {
		// 			let place = results[i];
		// 		}
		// 	}  
		// });
	}

	handleScriptCreate = () => this.setState({ scriptLoaded: false });
	handleScriptError = () => this.setState({ scriptError: true });
	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = (event) => {
		// NOTE: save image to amazon here...
		// once image is saved.. set imageURL to state
		event.preventDefault();
		this.props.addItem(this.state);
	}

	render() {
		return (
			<div className="item-input-container">
				<Script
					url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
					onCreate={this.handleScriptCreate}
					onError={this.handleScriptError}
					onLoad={this.handleScriptLoad}
				/>
				<div className="staged-image"><img src={this.props.location.state.blobURL}/></div>
				<form onSubmit={(event) => { this.handleSubmit(event) }}>
				<input onChange={this.handleOnChange} name="rating" value={this.state.rating} type="text" placeholder="Enter rating" /><br/>
				<textarea onChange={this.handleOnChange} name="review" value={this.state.review} type="textarea" placeholder="Enter your review" />
				<br/>
				<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { addItem })(ItemInput);