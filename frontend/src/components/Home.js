import React from 'react';
import { connect } from 'react-redux';
import VenueList from '../unused components/VenueList';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Home extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="container-search">
					<SearchBar />
				</div>
				<SearchResults />
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