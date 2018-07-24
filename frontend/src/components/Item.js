import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';

class VenueList extends React.Component {

	getAverageRating = (ratings) => {
		return '4.5';
	}

	getItemDistance = (lat, long) => {
		return '1.3';
	}

	render() {
		return (
			<div className="item-list">
				{
					this.props.items.map((item, index) => {
						return (
							<Link className="link" key={item.id} to={`/items/${item.id}`}>
								<div className="item" key={index}>
									<div className="image">
										<img src={item.photos[0].url}/>
									</div>
									<div className="description">
										<div className="name">{index + 1}. {item.name}</div>
										{item.rating ? <div className="avg-rating">Rating: {this.getAverageRating(item.ratings)}</div> : null }
										<div className="distance">{this.getItemDistance(item.lat, item.long)} miles away</div>
										{/*item.location.distance ? <div className="distance">{(item.location.distance / 1609).toFixed(2)} miles away</div> : null */}
										<div className="address">123 Main st, Fairfield</div>
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