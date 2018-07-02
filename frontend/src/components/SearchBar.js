import React from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../googleAPI';

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
		// this.props.getLocation({lat: null, long: null, location: this.state.location});
		// // this.setState({
		// // 	location: ''
		// // });
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
			<div className="container">
				<div className="search-bar">
					<form onSubmit={(event) => { this.handleSearch(event) }}>
						<input placeholder="Enter a location" value={this.state.location} name="location" onChange={this.handleOnChange} />
						<input type="submit" />
						<br />
						<button onClick={()=>{this.getCurrentLocation()}}>Search current location</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { })(SearchBar);