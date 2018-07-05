import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';

class Camera extends React.Component {
    state = {
    }

    componentDidMount() {
    }

	render() {
		return (
			<div className="camera-container">
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Camera);