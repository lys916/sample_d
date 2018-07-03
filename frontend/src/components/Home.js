import React from 'react';
import { connect } from 'react-redux';
import VenueList from './VenueList';
import SearchBar from './SearchBar';

class Home extends React.Component {

	render() {
		return (
			<div className="container">
				<SearchBar />
				{this.props.venues ? <VenueList /> : null }
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