import React from 'react';
import { connect } from 'react-redux';
import VenueList from '../unused components/VenueList';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NearbyItem from './NearbyItem';
import SearchItems from './SearchItems';
import SearchPlaces from './SearchPlaces';
import '../css/home.css';

class Home extends React.Component {
	state = {
		modal: true
	}

	render() {
		return (
			<div className="home-container">
				<SearchBar toggle={this.toggle}/>
				<SearchItems />
				{/*<SearchResults />*/}
				<NearbyItem />
				<SearchPlaces />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		venues: state.venues
	} 
}

export default connect(mapStateToProps, {  })(Home);