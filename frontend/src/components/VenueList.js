import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';

class VenueList extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="venue">
					<div className="item-list">
						{
							venues.map((venue, index) => {
								return (
									<div className="item" key={index}>
										<div className="name">{venue.name}</div>
										<div className="image">{venue.image}</div>
										<div className="description">{venue.description}</div>
										<div className="price">{venue.rating}</div> 
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(VenueList);