import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button, FormGroup, FormControl } from 'react-bootstrap';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';
import { addItem } from '../actions';
import ReactStars from 'react-stars';

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
		atCurrentRestaurant: false,
		selectedRestaurant: null,
		stageDelete: false
    }
    componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude }, ()=>{
				});
		  });
	  } else console.log("Geolocation is not supported by this browser");
	  console.log(this.recordPrice("Thiasdfasfasfasdfut"));
	}
	
	handleAddItem = () => {
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
		console.log('result is', results);
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				this.setState({locations: results});
				// for (let i = 0; i < results.length; i++) {
				// 	let place = results[i];
				// }
			}  
		});
	}

	handleScriptCreate = () => this.setState({ scriptLoaded: false });
	handleScriptError = () => this.setState({ scriptError: true });
	handleScriptLoad = () => this.setState({ scriptLoaded: true });

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	ratingChanged = (rating)=>{
		this.setState({rating});
	}
	handleSubmit = (event) => {
		// NOTE: save image to amazon here...
		// once image is saved.. set imageURL to state
		event.preventDefault();
		this.props.addItem(this.state);
	}

	toggleCurrentLocation = ()=>{
		this.setState({atCurrentRestaurant: !this.state.atCurrentRestaurant}, ()=>{
			if(this.state.atCurrentRestaurant){
				this.handleAddItem();
			}
		});
	}

	handleSelectRestaurant =(rest)=>{
		this.setState({selectedRestaurant: rest});
	}

	recordPrice = (input)=>{
	 if(input === "This is my input"){
	 	return true;
	 }else{
	 	return false;
	 }
	}

	handleRemoveRestaurant = ()=>{
		this.setState({selectedRestaurant: null, stageDelete: false});
	}

	toggleStageDelete = ()=>{
		this.setState({stageDelete: !this.state.stageDelete});
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
							<div className="rest-name">{this.state.selectedRestaurant.name}</div>
							<div className="rest-address">{this.state.selectedRestaurant.formatted_address}</div>
						</div>
						{this.state.stageDelete ? <div className="delete-selected-rest" onClick={()=>{this.handleRemoveRestaurant()}}>Remove</div> : null}
					</div>
				}
				
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