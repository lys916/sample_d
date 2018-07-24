import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button, FormGroup, FormControl } from 'react-bootstrap';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';
import { addItem } from '../actions';
import ReactStars from 'react-stars';
import axios from 'axios';
const ROOT_URL = 'http://localhost:5000';

class ItemInput extends React.Component {
    state = {
		lat: '',
		long: '',
		locations: null,
		location: null,
		name: '',
		tags: [],
		rating: '',
		review: '',
		price: '',
		imageURL: '',
		imageBlob: null,
		atCurrentRestaurant: false,
		selectedRestaurant: null,
		stageDelete: false
    }
    componentDidMount() {
    	// blobURL and blob iamge coming from Camera.js
    	this.setState({
    		imageURL: this.props.location.state.blobURL,
    		imageBlob: this.props.location.state.blob
    	});
    	// get user's current location in lat and lng
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude }, ()=>{
				});
		  });
	  } else console.log("Geolocation is not supported by this browser");
	}
	// when user is at the current restaurant.. this method will get invoked
	searchNearbyRestaurant = () => {
		const { lat, long } = this.state;
		console.log('latlong', lat, long);
		const currentLocation = new window.google.maps.LatLng(lat, long);
		const map = new window.google.maps.Map(document.createElement('div'));
		const request = {
			location: currentLocation,
			rankby: 'distance',
			type: 'restaurant'
		}

		const service = new window.google.maps.places.PlacesService(map);
		service.textSearch(request, (results, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				this.setState({locations: results});
			}  
		});
	}

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}
	// when user clicks on star rating
	ratingChanged = (rating)=>{
		this.setState({rating});
	}

	// 'handleSubmit' will send item data over to action 'add item'
	handleSubmit = (event) => {
		event.preventDefault();
		const {lat, long, name, selectedRestaurant, rating, review, price, imageURL, imageBlob} = this.state;
		// send item data to action
		this.props.addItem({lat, long, name, selectedRestaurant, rating, review, price, imageURL, imageBlob});
		// reset some state properties
		this.setState({rating: '', name: '', review: ''});
	}
	// set true or false depending if user is at current restaurant
	toggleCurrentLocation = ()=>{
		this.setState({atCurrentRestaurant: !this.state.atCurrentRestaurant}, ()=>{
			console.log('at current restaurant', this.state.atCurrentRestaurant);
			if(this.state.atCurrentRestaurant){
				// search nearby restaurant
				this.searchNearbyRestaurant();
			}
		});
	}
	// when user clicks on a particular restaurant from the list.. set it to state
	handleSelectRestaurant =(rest)=>{
		this.setState({selectedRestaurant: rest});
	}

	// state or set a restaurant for deletion
	toggleStageDelete = ()=>{
		this.setState({stageDelete: !this.state.stageDelete});
	}

	// when user remove the selected restaurant
	handleRemoveRestaurant = ()=>{
		this.setState({selectedRestaurant: null, stageDelete: false});
	}

	render() {
		const restaurantList = [];
		if(this.state.locations){
			for(let i = 0; i < 5; i++){
				restaurantList.push(this.state.locations[i]);
			}
		}
		return (
			<div className="item-input-container">
				{/*<Script
					url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
					onCreate={this.handleScriptCreate}
					onError={this.handleScriptError}
					onLoad={this.handleScriptLoad}
				/>*/}
				<div className="staged-image">
					<img src={this.props.location.state.blobURL}/>
				</div>
				{!this.state.selectedRestaurant ?
					<div>
						<div onClick={()=>{this.toggleCurrentLocation()}}>I'm currently not at this restaurant</div>

				<div onClick={()=>{this.toggleCurrentLocation()}}>I'm currently at this restaurant</div>

				{this.state.atCurrentRestaurant ? 
					<div>
						{
							restaurantList.map(rest => {
								return (
									<div key={rest.id} onClick={()=>{this.handleSelectRestaurant(rest)}}>
										<div className="rest-name">{rest.name}</div>
										<div className="rest-address">{rest.formatted_address}</div>
									</div>
								);
							})
						}
						<div>Restaurant not on the list? "Click I'm not at this restaurant and enter the restaurant name"
						</div>
					</div> 
					: <div>show form for enter restaurant</div>}
					</div> : 
					<div className="selected-rest-wrapper">
						<div className="selected-rest" onClick={()=>{this.toggleStageDelete()}}>
							<div className="rest-name">
								{this.state.selectedRestaurant.name}
								</div>
							<div className="rest-address">
								{this.state.selectedRestaurant.formatted_address}
							</div>
						</div>
						<input onChange={this.handleOnChange} name="name" value={this.state.name} placeholder="enter food name"/>
						{this.state.stageDelete ? <div className="delete-selected-rest" onClick={()=>{this.handleRemoveRestaurant()}}>Remove</div> : null}
					</div>
				}

				{/*todo: most this form into a new component ??*/}
				<form onSubmit={(event) => { this.handleSubmit(event) }}>
				<ReactStars  count={5} onChange={this.ratingChanged} size={35} color2={'#ffd700'} value={Number(this.state.rating)}/>
				<br/>
				<FormGroup controlId="formControlsTextarea">
     				 <FormControl componentClass="textarea" placeholder="Enter your review" onChange={this.handleOnChange} name="review" value={this.state.review} />
    			</FormGroup>
    		
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