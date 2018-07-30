import React from 'react';
import { connect } from 'react-redux';
import VenueList from '../unused components/VenueList';
import SearchBar from './SearchBar';
import NearbyItem from './NearbyItem';
import SearchItems from './SearchItems';
import '../css/home.css';

class Home extends React.Component {
	render() {
		console.log('home render');
		return (
			<div className="home-container">
				<SearchBar />
				<SearchItems />
				<NearbyItem />
				<br/><br/>
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
