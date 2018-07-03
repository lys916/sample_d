import React from 'react';
import { connect } from 'react-redux';

class Venue extends React.Component {

	render() {
		return (
			<div className="venue-detail">
				<h3>Venue Detail</h3>
				<p>Menu Item List</p>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Venue);