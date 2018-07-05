import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';

class ItemInput extends React.Component {
    state = {
    }

    componentDidMount() {
    }

	render() {
		return (
			<div className="item-input-container">
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(ItemInput);