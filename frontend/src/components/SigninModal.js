import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signIn} from '../actions/userAction';
import '../css/modal.css';

class SigninModal extends React.Component {

	state = {
    loginType: '',
    password: ''
  }

  handleSignIn = () => {
      this.props.signIn(this.state, this.props.history);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


	render() {
		return (
			<div className="user-join">
				<Modal className="modal" show={this.props.user.showSigninModal}>
			    <Modal.Body className="modal-body">
					<div className="exit" onClick={()=>{this.props.toggleModal('showSigninModal')}}>
						<i className="material-icons">cancel</i>
					</div>
			    	<div className="modal-body">
						<div className="title">Homechef Login</div>
        				<input name="loginType" value={this.state.loginType} 
        					placeholder="Email or Phone #" onChange={this.handleOnChange}/><br />

        				<input name="password" type="password" value={this.state.value} 
        					placeholder="Password" onChange={this.handleOnChange}/><br />

        				<button className="signin" onClick={() => {this.handleSignIn()}}>Sign in</button><br />
					</div>
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

export default connect(mapStateToProps, { signIn })(SigninModal);