import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../actions/index';

class SearchBar extends React.Component {
	state = {
		query: '',
		location: '',
		lat: '',
		long: ''
	}

	async componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.props.getLocation({ lat: latitude, long: longitude, query: 'Restaurant' });
		 	});
		} else {
			console.log("Geolocation is not supported by this browser")
		}
	}

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSearch = (event) => {
		event.preventDefault();
		this.props.getLocation({lat: null, long: null, location: this.state.location, query: this.state.query });
	}

	getCurrentLocation = () => {
		if (navigator.geolocation) {
      		navigator.geolocation.getCurrentPosition((position)=>{
				const { latitude, longitude } = position.coords;
				this.props.getLocation({ lat: latitude, long: longitude, query: this.state.query });
        	});
    	} else {
       		console.log("Geolocation is not supported by this browser")
    	}
	}

	render() {
		return (
			<div className="search">
				<form onSubmit={(event) => { this.handleSearch(event) }}>
					<input className="query" placeholder="Looking for?" value={this.state.query} name="query" onChange={this.handleOnChange} />
					<div className="search-bar">
						<input className="location" placeholder="Enter a location" value={this.state.location} name="location" onChange={this.handleOnChange} />
						<button className="search-location" type="submit"><i className="material-icons">search</i></button>
					<br />
					</div>
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