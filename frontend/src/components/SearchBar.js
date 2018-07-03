import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../actions/index';

class SearchBar extends React.Component {
	state = {
		location: ''
	}

	handleOnChange = (event) => {
		this.setState({
			location: event.target.value
		});
	}

	handleSearch = (event) => {
		event.preventDefault();
		console.log('searching', this.state.location);
		this.props.getLocation({lat: null, long: null, location: this.state.location});
		this.setState({
			location: ''
		});
	}

	getCurrentLocation = () => {
		if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition((position)=>{
        		const { latitude, longitude } = position.coords;
        		this.props.getLocation({lat: latitude, long: longitude, location: null});
        	});
    	} else {
       	console.log("Geolocation is not supported by this browser")
    	}
	}

	render() {
		return (
			<div className="search">
				<form onSubmit={(event) => { this.handleSearch(event) }}>
					<input className="location" placeholder="Enter a location" value={this.state.location} name="location" onChange={this.handleOnChange} />
					<button className="search-location" type="submit"><i className="material-icons">search</i></button>
					<br /><br/>
				</form>
				<button className="current-location" onClick={()=>{this.getCurrentLocation()}}>Search current location</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { getLocation })(SearchBar);