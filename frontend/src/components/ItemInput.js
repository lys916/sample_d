import React from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import GOOGLE_API_KEY from './config';
import { addItem, addRating, fetchMenu } from '../actions';
import AddReview from './AddReview';
import AddButton from './AddButton';
import AddPhotoModal from './AddPhotoModal';
import { Link } from 'react-router-dom';
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
		imageURL: null,
		imageBlob: null,
		atCurrentRestaurant: true,
		selectRestaurant: false,
		selectedRestaurant: null,
		selectedItem: null,
		stageDelete: false,
		newDish: false,
		searchPlaces: false,
		term: '',
		imageAdded: false,
		showModal: false
    }
   componentDidMount() {
    	// blobURL and blob image coming from Camera.js
    	this.setState({
    		imageURL: this.props.location.state.blobURL,
			imageBlob: this.props.location.state.blob,
			// selectedRestaurant: this.props.location.state.item.place,
			// name: this.props.location.state.item.name,
			// selectedItem: this.props.location.state.item.name
    	});
    	// get user's current location in lat and lng
    	if(this.props.location.cameraState){
    		this.setState(this.props.location.cameraState);
    	}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude }, ()=>{
					this.searchNearbyRestaurant();
				});
		  });
	  	} else console.log("Geolocation is not supported by this browser");
	}
	setupGooglePlaces = ()=>{
			// google api for places search
	  	const input = document.getElementById('pac-input');
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', ()=> {
         const place = autocomplete.getPlace();
         this.setState({selectedRestaurant: place, searchPlaces: false}, ()=>{
			this.props.fetchMenu(place.id);
		});
      });
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
				if(results.length > 0){
					this.setState({locations: results, selectRestaurant: true});
				}
			}  
		});
	}

	toggleModal = ()=>{
		this.setState({showModal: !this.state.showModal, show: !this.state.show});
	}

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}
	// when user clicks on star rating
	ratingChanged = (rating)=>{
		this.setState({rating});
	}

	handleUpload = (e) => {
	   const file = e.target.files[0];
	   const blobURL = URL.createObjectURL(file);
	   this.setState({showModal: false, imageBlob: file, imageURL: blobURL }, ()=>{
	   }); 
    }

	// 'handleSubmit' will send item data over to action 'add item'
	handleSubmit = (event) => {
		event.preventDefault();
		console.log('blob in ItemInput is', this.state.imageBlob);
		const {name, id, selectedRestaurant, rating, review, price, imageURL, imageBlob} = this.state;
		// if state.id is not null then this means user is leaving a 
		// review for a existing item in the db.
		// else if there is no id then user is creating a new item.
		if (id) {
			console.log('comes into addRating', id);
			// create new review for this dish
			// send item data to action
			this.props.addRating({id, name, selectedRestaurant, rating, review, price, imageURL, imageBlob}, this.props.history);
		} else {
			console.log('comes into addItem', id);
			// create new item including first review
			// send item data to action
			this.props.addItem({name, selectedRestaurant, rating, review, price, imageURL, imageBlob}, this.props.history);
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
		this.setState({selectedRestaurant: rest, selectRestaurant: false}, ()=>{
			this.props.fetchMenu(rest.id);
		});
	}

	// stage or set a restaurant for deletion
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
			this.setState({name: item.name, id: item._id}, ()=>{
				this.props.history.push(`${this.props.location.pathname}/${item.name}`);
			});
		}
		this.setState({selectedItem: true});
	}

	toggleSearchPlaces = ()=>{
		this.setState({searchPlaces: true, selectRestaurant: false});
	}

	cancelView = ()=>{
        this.props.history.push('/');
    }

	render() {
		console.log('input item props', this.props);
		const restaurantList = [];
		if(this.state.locations){
			for(let i = 0; i < 5; i++){
				restaurantList.push(this.state.locations[i]);
			}
		}
		return (
			<div className="item-input">
				<AddPhotoModal show={this.state.showModal} toggle={this.toggleModal} {...this.state} {...this.props} handleUpload={this.handleUpload }/>
				{/*IMAGE CONTAINER*/}
				{this.state.selectedItem ? 
					<div className="staged-image">
						
						{this.state.imageURL ? <img src={this.state.imageURL} /> : <img src="/assets/no_image.png" /> }
						{/*<div className="exit" onClick={()=>{this.cancelView()}}><i className="material-icons">cancel</i></div>*/}
						<div onClick={this.toggleModal}>
							<AddButton style={addButtonStyle} />
						</div>
					</div> 
				: null } 
					

				{/*IF USER IS AT THE CURRENT RESTAURANT - SHOW A LIST OF RESTAURANT FOR USER SELECTION*/}
				{this.state.atCurrentRestaurant && !this.state.selectedRestaurant ? 
					<div className="rest-list">
						<div>Select a restaurant</div>
						{restaurantList.map(rest => {
							return (
								<div className="select-rest" key={rest.id} onClick={()=>{this.handleSelectRestaurant(rest)}}>
									<div className="rest-name">{rest.name}</div>
									<div className="rest-address">{rest.formatted_address}</div>
								</div>
							);
						})}
						<br/>
						<br/>
						<br/>
						<button onClick={()=>{this.toggleSearchPlaces()}}>I'm not currently at these restaurants</button>
					</div> : null }


				{/*SHOW SELECTED RESTAURANT INFO AND MENU LIST*/}
				{this.state.selectedRestaurant ? 
					<div className="selected-rest-container">
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
						</div> : <div className="selected-item">{this.state.name}</div> }

						
						{this.state.stageDelete ? <div className="delete-selected-rest" onClick={()=>{this.handleRemoveRestaurant()}}>Remove</div> : null}
					</div> 
				: null}

				{/*INPUT BAR FOR SEARCHING FOR PLACES*/}
				{this.state.searchPlaces ? <input id="pac-input" name="term" onClick={this.setupGooglePlaces} onChange={this.handleOnChange} placeholder="enter city & restaurant name" value={this.state.term} style={{width: '80vw', maxWidth: '500px'}}/> : null}

				{/*ADD REVIEW STATELESS COMPONENT*/}
				{this.state.selectedItem ? 
				<form onSubmit={(event) => { this.handleSubmit(event) }}>
					<AddReview ratingChanged={this.ratingChanged} handleOnChange={this.handleOnChange} rating={this.state.rating} value={this.state.value}/>
					<button type="submit">Submit</button>
				</form> : null}
				<div className="break-vh"></div>
			</div>
		);
	}
}

const addButtonStyle = {
	button: {
		background: '#DE3734',
		height: '35px',
		width: '35px',
		position: 'absolute',
		color: 'white',
		bottom: '0',
		right: '0',
		borderRadius: '100%',
		margin: '5px',
		boxShadow: '2px 3px 4px #bbbbbb'
	},
	icon: {
		fontSize: '23px',
		marginTop: '5px'
	},
	iconImage: 'add_a_photo'

}

const mapStateToProps = (state) => {
	return {
		menu: state.items.menu
	} 
}

export default connect(mapStateToProps, { addItem, addRating, fetchMenu })(ItemInput);