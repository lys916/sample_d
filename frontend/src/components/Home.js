import React from 'react';
import { connect } from 'react-redux';
import Venue from './Venue';
import VenueList from './VenueList';
import SearchBar from './SearchBar';
import Item from './Item';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Home extends React.Component {

	render() {
		console.log('home');
		return (
			<div className="container">
			<Route path="/" component={SearchBar} />
			<Route path="/venues" component={VenueList} />
          <Route path="/venues/:id" component={Venue} />
          <Route path="/venues/:id/:menuid" component={Item} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Home);