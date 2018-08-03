import React from 'react';
import { connect } from 'react-redux';
import { getItems, searchItems } from '../actions';
import { toggleModal, signOut } from '../actions/userAction';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AddReviewModal from './AddReviewModal';
import JoinModal from './JoinModal';
import SigninModal from './SigninModal';
import ConfirmModal from './ConfirmModal';
import '../css/search_bar.css';
class SearchBar extends React.Component {
	state = {
		service: null,
		map: null,
		term: '',
		location: '',
		lat: null,
		long: null,
		inputType: 'select',
		showModal: false,
		showJoinModal: false,
		showSigninModal: false
	}

	componentDidMount() {
		console.log('history', this.props.history);
		const input = document.getElementById('search-location');
		const autocomplete = new window.google.maps.places.Autocomplete(input);
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			console.log('PLACE', place.formatted_address);
			this.setState({ location: place.formatted_address });
		});
	}

	getCurrentLocation = ()=>{
		if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
            this.setState({ lat: latitude, long: longitude }, ()=>{
            })
         });
      } else console.log("Geolocation is not supported by this browser");
	}

	handleSearch = (event) => {
		event.preventDefault();
		const searchData = {
				term: this.state.term,
				location: this.state.location
		}
		if(this.state.location === "Current location"){
			alert();
			searchData.lat = this.state.lat;
			searchData.long = this.state.long;
			this.props.searchItems(searchData);
		}else{
			console.log('location', this.state.location);
			const geocoder = new window.google.maps.Geocoder();
    		geocoder.geocode( { 'address': this.state.location}, (results, status) => {
            if (status == 'OK') {
                  const lat = results[0].geometry.location.lat();
                  const long = results[0].geometry.location.lng();
                  searchData.lat = lat;
                  searchData.long = long;
                  this.props.searchItems(searchData);
            } else {
            alert('Geocode was not successful for the following reason: ' + status);
            }
         });
      }
		this.setState({term: ''});
	}

	getCurrentLocation = () => {
		if (navigator.geolocation) {
      		navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.setState({ lat: latitude, long: longitude });
        	});
    	} else console.log("Geolocation is not supported by this browser");
	}

	toggleInputType = ()=>{
		if(this.state.inputType === 'select'){
			this.setState({inputType: 'text'});
		}
	}

	handleToggleModal = (modalName, nextRoute, prevRoute, alertMessage)=>{
		//keeping track of next route and previous route, in case where we want
		//to redirect user after successful login. 
		//login can be made through addreview butotn on searchbar or input item page
		this.props.toggleModal({modalName, nextRoute, prevRoute, alertMessage});
	}

	handleOnChange = (event) => {
		if (event.target.value === "Current location") this.getCurrentLocation();
		this.setState({ [event.target.name]: event.target.value });
	}

	handleAddReview = ()=>{
		if(this.props.user.confirmed && this.props.user.logged_in){
			this.props.history.push({pathname: '/addItem'});
		}
		if(this.props.user.userId && !this.props.user.confirmed){
			this.handleToggleModal('showConfirmModal', 'addItem', null, 'Please confirm your account. ');
		}
		if(!this.props.user.logged_in){
			this.handleToggleModal('showSigninModal', 'addItem', null, 'You must be signed in to add a review.');
		}
		
	}

	handleSignOut = ()=>{
		this.props.signOut();
	}

	render() {
		return (
			<div className="search">
				<JoinModal toggleModal={this.handleToggleModal}/>
				<SigninModal toggleModal={this.handleToggleModal} history={this.props.history}/>
				<ConfirmModal toggleModal={this.handleToggleModal}/>
				<div class="top-bar">
					<div onClick={this.handleAddReview} className="top-button add-button">Add review</div>
					{this.props.user.logged_in ? 
						<div className="signout-profile">
							<div className="top-button sign-out" onClick={this.handleSignOut}>Sign out</div>
							<div className="top-button profile"><i className="material-icons">person</i></div>
						</div> : 
						<div className="signin-join">
						<div onClick={()=>{this.handleToggleModal('showSigninModal', null, null, 'Sign in')}} className="top-button signin">Sign in</div>
							<div onClick={()=>{this.handleToggleModal('showJoinModal')}} className="top-button join">Join</div>
						</div>}
					
				</div>
				<div className="search-bars">
					<AddReviewModal history={this.props.history} show={this.state.showModal} toggle={this.toggleModal}/>
				<form onSubmit={(event)=>{this.handleSearch(event)}}>
					<input 
						className="search-term" 
						placeholder="e.g. tacos, noodles" 
						value={this.state.term} 
						name="term" 
						onChange={this.handleOnChange} />
					<input 
						id='search-location' 
						list="current-location" 
						name="location" 
						placeholder="enter a location" 
						value={this.state.location} 
						onChange={this.handleOnChange}/>
					<datalist id="current-location">
						<option value="Current location" className="option" >Current location</option>
					</datalist>
					<button type="submit">Search</button>
					</form>
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('user', state.user);
	return {
		predictions: state.items.autoCompleteItems,
		user: state.user
	} 
}

export default connect(mapStateToProps, { getItems, searchItems, toggleModal, signOut })(SearchBar);