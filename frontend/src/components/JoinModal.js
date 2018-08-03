import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signUp} from '../actions/userAction';
import axios from 'axios';
import '../css/modal.css';

class JoinModal extends React.Component {

  state = {
    name: '',
    loginType: '',
    password: ''
  }
handleSignUp = () => {
	this.props.signUp(this.state);
   // if(this.state.name !== '' || this.state.loginType !== '' || this.state.password !== ''){  
   //    axios.post('http://localhost:5000/userSignup', this.state)
   //    .then(res => {
   //       if(res.status === 200){
   //          this.setState({needConfirm: true}, ()=>{
   //          alert('Check your email or phone sms for a confirmation #');
   //        });
   //       }
   //    });
   // }
}

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


	render() {
		return (
			<div className="user-join">
				<Modal className="modal" show={this.props.user.showJoinModal}>
			    <Modal.Body className="modal-body">
					<div className="exit" >
						<i className="material-icons" onClick={()=>{this.props.toggleModal('showJoinModal')}}
						>cancel</i>
					</div>
					{this.state.needConfirm ? <div>

						<br/>
						<div>Check your email or phone SMS for confirmation code.</div>
						<br/>
						<input placeholder="Enter code" value={this.state.conCode} name="conCode" />
						<br/>
						<br/>

						</div> : <div className="modal-body">
				    	<div className="title">Register</div>
				      <input type="text" name="name" value={this.state.name} 
				        placeholder="Name" onChange={this.handleOnChange}/><br />

				      <input type="text" name="loginType" value={this.state.loginType} 
				        placeholder="Email" onChange={this.handleOnChange}/><br />

				      <input type="password" name="password" value={this.state.password} 
				        placeholder="Password" onChange={this.handleOnChange}/><br />

				      <button onClick={() => {this.handleSignUp()}}>Register</button><br />
					</div>}
			    	
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

export default connect(mapStateToProps, { signUp })(JoinModal);