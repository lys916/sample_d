import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';
import { addItem, addRating, fetchMenu } from '../actions';
import ReactStars from 'react-stars';
import '../css/iteminput.css';

class ItemInput extends React.Component {
    state = {
		lat: '',
		long: '',
		locations: null,
		location: null,
		name: '',
		id: null,
		tags: [],
		rating: '',
		review: '',
		price: '',
		image: '',
		imageURL: '',
		imageBlob: null,
		atCurrentRestaurant: true,
		selectedRestaurant: false,
		selectedItem: false,
		stageDelete: false,
		newDish: false
    }
    componentDidMount() {
    	// blobURL and blob image coming from Camera.js
    	this.setState({
    		imageURL: this.props.location.state.blobURL,
			imageBlob: this.props.location.state.blob,
    	});
    	// get user's current location in lat and lng
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude }, ()=>{
					this.searchNearbyRestaurant();
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
		// search nearby restaurants
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
		console.log('blob in ItemInput is', this.state.imageBlob);
		const {lat, long, name, id, selectedRestaurant, rating, review, price, imageURL, imageBlob} = this.state;
		if (id) {
			// create new review for this dish
			// send item data to action
			this.props.addRating({lat, long, id, name, selectedRestaurant, rating, review, price, imageURL, imageBlob}, this.props.history);
		} else {
			// create new item including first review
			// send item data to action
			this.props.addItem({lat, long, name, selectedRestaurant, rating, review, price, imageURL, imageBlob}, this.props.history);
		}
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
		this.setState({selectedRestaurant: rest}, ()=>{
			this.props.fetchMenu(rest.id);
		});
	}

	// state or set a restaurant for deletion
	toggleStageDelete = ()=>{
		this.setState({stageDelete: !this.state.stageDelete});
	}

	// when user remove the selected restaurant
	handleRemoveRestaurant = ()=>{
		this.setState({selectedRestaurant: null, stageDelete: false});
	}

	handleSelectItem = (item)=>{
		console.log('ITEM SELECT', item);
		if(item){
			this.setState({name: item.name, id: item._id});
		}
		this.setState({selectedItem: true});
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
						<div>Select a restaurant</div>
						{this.state.atCurrentRestaurant ? 
							<div className="rest-list">
								{
									restaurantList.map(rest => {
										return (
											<div className="select-rest" key={rest.id} onClick={()=>{this.handleSelectRestaurant(rest)}}>
												<div className="rest-name">{rest.name}</div>
												<div className="rest-address">{rest.formatted_address}</div>
											</div>
										);
									})
								}
								<br/>
								<br/>
								<br/>
								<button>I'm not currently at this restaurant</button>
							</div> 
						: <div>Show form for user to enter restaurant info</div>}
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

						{ this.props.menu.length > 0 && !this.state.selectedItem && !this.state.newDish ? 
							<div className="dish-list">
							<br/>
							<br/>
							<div>Select a dish</div>
							{ this.props.menu.map(item=>{
								return (
									<div className="select-dish" onClick={()=>{this.handleSelectItem(item)}}>{item.name}</div>
								);
							})}
							<button onClick={()=>{this.setState({newDish: true})}}>Add new dish</button>
							</div> : null }

						{ this.state.newDish ? 
							<div>
							<input onChange={this.handleOnChange} name="name" value={this.state.name} placeholder="
							Enter dish name"/>
							<button onClick={()=>{this.handleSelectItem()}}>Next</button> </div> : null }

						{ !this.props.menu.length > 0 && !this.state.selectedItem ? <div>
							<div>There's no item on the menu for this restaurant at this time</div>
							<div>Add a new dish</div>
							<input onChange={this.handleOnChange} name="name" value={this.state.name} placeholder="
							Enter dish name"/>
							<button onClick={()=>{this.handleSelectItem()}}>Next</button>
						</div> : <div>{this.state.name}</div> }

						
						{this.state.stageDelete ? <div className="delete-selected-rest" onClick={()=>{this.handleRemoveRestaurant()}}>Remove</div> : null}
					</div>
				}

				{/*todo: most this form into a new component ??*/}
				{this.state.selectedItem ? <form onSubmit={(event) => { this.handleSubmit(event) }}>
				<ReactStars  count={5} onChange={this.ratingChanged} size={35} color2={'#ffd700'} value={Number(this.state.rating)}/>
				<br/>
				<FormGroup controlId="formControlsTextarea">
     				 <FormControl componentClass="textarea" placeholder="Enter your review" onChange={this.handleOnChange} name="review" value={this.state.review} />
    			</FormGroup>
    		
    			<br/>
				<button type="submit">Submit</button>
				</form> : null}
				

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menu: state.items.menu
	} 
}

export default connect(mapStateToProps, { addItem, addRating, fetchMenu })(ItemInput);