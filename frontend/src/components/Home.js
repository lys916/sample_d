import React from 'react';
import { connect } from 'react-redux';
import VenueList from '../unused components/VenueList';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NearbyItem from './NearbyItem';

class Home extends React.Component {

	render() {
		return (
			<div className="container">
				<SearchBar />
				<SearchResults />
				<NearbyItem /> 
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