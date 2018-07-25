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
		inputType: 'select'
	}

	componentDidMount() {
		
	}

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
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
				lat: this.state.lat,
				long: this.state.long,
				term: this.state.term,
				location: this.state.location
		}
		if(this.state.location === "Current location"){
			searchData.type = 'current';
			this.props.searchItems(searchData);
		}else{
			searchData.type = 'city';
			this.props.searchItems(searchData);
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

	handleOnChange = (event) => {
		if(event.target.value === "Current location"){
			this.getCurrentLocation();
		}
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return (
			<div className="search">
				<AddReviewModal />
				<form onSubmit={(event)=>{this.handleSearch(event)}}>
				<input className="search-term" placeholder="e.g. tacos, noodles" value={this.state.term} name="term" onChange={this.handleOnChange} />

				<input list="current-location" name="location" placeholder="enter a location" value={this.state.location} onChange={this.handleOnChange}/>

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
	} 
}

export default connect(mapStateToProps, { getItems, searchItems })(SearchBar);