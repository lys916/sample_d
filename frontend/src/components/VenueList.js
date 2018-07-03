import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';

class VenueList extends React.Component {

	render() {
		console.log(this.props.venues);
		return (
			<div className="item-list">
				{
					this.props.venues.map((venue, index) => {
						return (
							<Link className="link" key={venue.id} to={`/venues/${index}`}>
								<div className="venue" key={index}>
									<div className="image">
										<img src={venue.bestPhotoPrefix + 'width500' + venue.bestPhotoSuffix}/>
									</div>
									<div className="description">
										<div className="name">{index + 1}. {venue.name}</div>
										{venue.rating ? <div className="avg-rating">Rating: {venue.rating}</div> : null }
										<div className="distance">{(venue.location.distance / 1609).toFixed(2)} miles away</div>
										<div className="address">{venue.location.address ? `${venue.location.address},` : null } {venue.location.city}</div>
									</div>
								</div>
							</Link>
						)
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		venues: state.venues
	} 
}

export default connect(mapStateToProps, {  })(VenueList);