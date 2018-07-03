import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';

class VenueList extends React.Component {

	render() {
		return (
			<div className="item-list">
				{
					this.props.venues.map((venue, index) => {
						return (
							<Link className="link" key={venue.id} to={`/venues/${venue.id}`}>
								<div className="venue" key={index}>
									<div className="image">
										<img />
									</div>
									<div className="description">
										<div className="name">{index + 1}. {venue.name}</div>
										<div className="avg-rating">Avg:{venue.rating}</div>
										<div className="distance">{venue.location.distance}</div>
										<div className="address">{venue.location.address}, {venue.location.city}</div>
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