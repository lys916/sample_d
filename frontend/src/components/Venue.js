import React from 'react';
import { connect } from 'react-redux';

class VenueList extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="venue">
					<div className="item-list">
						
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