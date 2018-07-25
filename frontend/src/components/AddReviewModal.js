import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/add_review.css';

class AddReviewModal extends React.Component {

	state = {
		show: false
	}

	toggle = ()=>{
		this.setState({show: !this.state.show});
	}

	render() {
		return (
			<div className="add-review">
				<div onClick={this.toggle} className="add-button">Add review</div>
				<Modal className="modal" show={this.state.show}>


			    <Modal.Body className="modal-body">
			    	<div className="modal-body">
				    	<Link to="/takePhoto"><button>Take a photo</button></Link><br/>
				    	<button>Upload photo</button><br/>
				    	<Link to={{ pathname: `/addItem`, state: { blob: null, blobURL: null }}}><button>Review without photo</button></Link>
			    	</div>
			    </Modal.Body>

			    <Modal.Footer>
			      <Button onClick={this.toggle}>Cancel</Button>
			    </Modal.Footer>
			  </Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(AddReviewModal);