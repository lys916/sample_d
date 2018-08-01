import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/modal.css';

class AddPhotoModal extends React.Component {

	state = {
	}

	test = ()=>{
		alert();
	}
	render() {
		console.log('prop - add review modal', this.props);
		let test = {};
		if(this.props.state){
			test.selectedRestaurant = this.props.state.selectedRestaurant;
			test.name = this.props.state.name;
			console.log('STATEATEW', test);
		}

		return (
			<div className="add-photo">
				<Modal className="modal" show={this.props.show}>
			    <Modal.Body className="modal-body">
					<div className="exit" onClick={()=>{this.props.toggle('photo')}}>
						<i className="material-icons">cancel</i>
					</div>
			    	<div className="modal-body">
				    	<Link to={{ pathname: `/takePhoto`, addItemState: {...this.props}, fromRoute: this.props.fromRoute, itemId: this.props.itemId }}>
				    		<div className="camera-button"  onClick={()=>{this.props.toggle('photo')}}>
					    		<i className="material-icons">photo_camera</i>
					    		<div>Open camera NOW</div>
				    		</div>
				    	</Link><br/>
				    	<div className="device-file">
							<i className="material-icons">cloud_upload</i>
							<input type="file" id="file" className="inputfile" accept="image/*" name='deviceUpload' capture="camera" onChange={this.props.handleUpload} />
							<label htmlFor="file" className="choose-file">Choose a file</label><br/>
				    	</div>
			    	</div>
			    </Modal.Body>
			  </Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(AddPhotoModal);