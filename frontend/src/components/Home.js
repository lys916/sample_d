import React from 'react';
import { connect } from 'react-redux';
import VenueList from '../unused components/VenueList';
import SearchBar from './SearchBar';
import NearbyItem from './NearbyItem';
import SearchItems from './SearchItems';
import styled from 'styled-components';

const HomeDiv = styled.div`
	background: #efefef;
`;

class Home extends React.Component {
	render() {
		console.log('home render');
		return (
			<HomeDiv>
				<SearchBar history={this.props.history}/>
				<SearchItems />
				<NearbyItem />
				<br/><br/>
			</HomeDiv>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		venues: state.venues
	} 
}

export default connect(mapStateToProps, {  })(Home);
