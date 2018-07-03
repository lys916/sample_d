import React from 'react';
import { connect } from 'react-redux';
import VenueList from './VenueList';
import SearchBar from './SearchBar';

class Home extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="container-search">
					<SearchBar />
				</div>
				<div className="container-list">
					{this.props.venues ? <VenueList /> : null }
				</div>
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