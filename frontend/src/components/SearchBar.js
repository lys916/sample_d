import React from 'react';
import { connect } from 'react-redux';
import { getItems, searchItems } from '../actions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AddReviewModal from './AddReviewModal';
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
		showModal: false
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

	toggleModal = ()=>{
		this.setState({showModal: !this.state.showModal});
	}

	handleOnChange = (event) => {
		if (event.target.value === "Current location") this.getCurrentLocation();
		this.setState({ [event.target.name]: event.target.value });
	}

	handleAddReview = ()=>{
		this.props.history.push({pathname: '/addItem'});
	}

	render() {
		return (
			<div className="search">
				<div onClick={this.handleAddReview} className="add-button">Add review</div>
				<AddReviewModal history={this.props.history} show={this.state.showModal} toggle={this.toggleModal}/>
				<form onSubmit={(event)=>{this.handleSearch(event)}}>
				<input className="search-term" placeholder="e.g. tacos, noodles" value={this.state.term} name="term" onChange={this.handleOnChange} />

				<input id='search-location' list="current-location" name="location" placeholder="enter a location" value={this.state.location} onChange={this.handleOnChange}/>

				<datalist id="current-location">
					<option value="Current location" className="option" >Current location</option>
				</datalist>
				<button type="submit">Search</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		predictions: state.items.autoCompleteItems,
	} 
}

export default connect(mapStateToProps, { getItems, searchItems })(SearchBar);