import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/add_review.css';

class AddReviewModal extends React.Component {

	state = {
		show: false,
		blob: null,
		blobURL: null
	}

	toggle = ()=>{
		this.setState({show: !this.state.show});
	}
	handleUpload = (e) => {
	   const file = e.target.files[0];
	   const blobURL = URL.createObjectURL(file);
	   this.setState({show: false, blob: file, blobURL }, ()=>{
	   	this.props.history.push({
				pathname: '/addItem',
				state: { blob: this.state.blob, blobURL: this.state.blobURL }
			})
	   });
     
   }

	render() {
		return (
			<div className="add-review">
				<div onClick={this.toggle} className="add-button">Add review</div>
				<Modal className="modal" show={this.state.show}>


			    <Modal.Body className="modal-body">
			    	<div className="modal-body">
				    	<Link to="/takePhoto"><button>Take a photo</button></Link><br/>
				    	<input type="file" id="file" className="inputfile" accept="image/*" name='deviceUpload' capture="camera" onChange={this.handleUpload} />
				    	<label htmlFor="file" className="choose-file">Choose a file</label><br/>
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