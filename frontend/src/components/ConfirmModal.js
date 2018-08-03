import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signUp, confirm} from '../actions/userAction';
import axios from 'axios';
import '../css/modal.css';

class JoinModal extends React.Component {

  state = {
    conCode: ''
  }
handleConfirm = () => {
	const userData = {
		userId: this.props.user.userId,
		conCode: this.state.conCode
	}
	this.props.confirm(userData);
}

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

   handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


	render() {
		return (
			<div className="user-join">
				<Modal className="modal" show={this.props.user.showConfirmModal}>
			    <Modal.Body className="modal-body">
					<div className="exit" onClick={()=>{this.props.toggleModal('showConfirmModal')}}>
						<i className="material-icons">cancel</i>
					</div>
					<div>
						<br/>
						<div>Check your email or phone SMS for confirmation code.</div>
						<br/>
						<input placeholder="Enter code" value={this.state.conCode} name="conCode" onChange={this.handleOnChange} />
						<br/>
						<br/>
					</div> 
				      <button onClick={this.handleConfirm}>Confirm</button><br />
			    </Modal.Body>
			  </Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	} 
}

export default connect(mapStateToProps, { signUp, confirm })(JoinModal);