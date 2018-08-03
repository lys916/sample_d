import React from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
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
    	if(this.props.location.state){
	    	this.setState({
				imageURL: this.props.location.state.blobURL,
				imageBlob: this.props.location.state.blob,
	    	});
    	}
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
		this.toggleModal();
	   const file = e.target.files[0];
	   const blobURL = URL.createObjectURL(file);
	   this.setState({imageBlob: file, imageURL: blobURL });
    }

	// 'handleSubmit' will send item data over to action 'add item'
	handleSubmit = (event) => {
		event.preventDefault();
		console.log('blob in ItemInput is', this.state);
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
		const restaurantList = [];
		if (this.state.locations) {
			for (let i = 0; i < 5; i++) {
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
						<h3>Restaurants close by</h3>
							{restaurantList.length > 0 ? 
								restaurantList.map(rest => {
									return (
										<div className="select-rest" key={rest.id} onClick={()=>{this.handleSelectRestaurant(rest)}}>
											<h4 className="rest-name">{rest.name}</h4>
											<div className="rest-address">{rest.formatted_address}</div>
										</div>
									);
								}) 
							: <h4>Finding your current location...</h4> }
						<br/>
						<button onClick={()=>{this.toggleSearchPlaces()}}>I'm not close by</button>
					</div> 
				: null }


				{/*SHOW SELECTED RESTAURANT INFO AND MENU LIST*/}
				{this.state.selectedRestaurant ? 
					<div className="selected-rest-container">
						<div className="selected-rest" onClick={()=>{this.toggleStageDelete()}}>
							<h3 className="rest-name">
								{this.state.selectedRestaurant.name}
							</h3>
							<div className="rest-address">
								{this.state.selectedRestaurant.formatted_address}
							</div>
						</div>

						{ this.props.menu.length > 0 && !this.state.selectedItem && !this.state.newDish ? 
							<div className="dish-list">
								<h3 className='select-title'>Which dish are you rating?</h3>
								{ this.props.menu.map(item=>{
									return (
										<button className="selectable-dish" key={item._id} onClick={()=>{this.handleSelectItem(item)}}>{item.name}</button>
									);
								})}
								<button className='add-new-dish' onClick={()=>{this.setState({newDish: true})}}>Can't find it?<br />add a new dish!</button>
							</div> : null }

						{ this.state.newDish ? 
							<div className='input-new-dish'>
								<input 
									onChange={this.handleOnChange}
									className='new-dish-text-input'
									name="name" 
									value={this.state.name} 
									placeholder="Enter dish name"
								/>
								<button onClick={()=>{this.handleSelectItem()}}>Create</button>
							</div> 
						: null }

						{ !this.props.menu.length > 0 && !this.state.selectedItem ? 
							<div>
								<h4>Oops! No items on the menu<br />for this restaurant right now</h4>
								<h4>Can you add it for us?</h4>
								<div className='input-new-dish'>
									<input 
										onChange={this.handleOnChange} 
										name="name"
										className='new-dish-text-input'
										value={this.state.name} 
										placeholder="Enter dish name"
									/>
									<button onClick={()=>{this.handleSelectItem()}}>Next</button>
								</div>
							</div> 
						: <div className="selected-item">{this.state.name}</div> }
						
						{this.state.stageDelete ? 
							<div className="delete-selected-rest" onClick={()=>{this.handleRemoveRestaurant()}}>
								Remove
							</div> 
						: null}
					</div> 
				: null}

				{/*INPUT BAR FOR SEARCHING FOR PLACES*/}
				{this.state.searchPlaces ? 
					<input
					    id="pac-input" 
					    name="term" 
					    onClick={this.setupGooglePlaces} 
					    onChange={this.handleOnChange} 
					    placeholder="find by entering city & restaurant name"
					    value={this.state.term} 
					    style={{width: '80vw', maxWidth: '500px'}}
                    /> 
				: null}

				{/*ADD REVIEW STATELESS COMPONENT*/}
				{this.state.selectedItem ? 
					<form onSubmit={(event) => { this.handleSubmit(event) }}>
						<AddReview ratingChanged={this.ratingChanged} handleOnChange={this.handleOnChange} rating={this.state.rating} value={this.state.value}/>
						<button type="submit">Submit</button>
					</form> 
				: null}
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