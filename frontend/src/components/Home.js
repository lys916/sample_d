import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import VenueList from './VenueList';

class Home extends React.Component {

	render() {
		return (
			<div className="container">
				<SearchBar />
				<VenueList />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Home);