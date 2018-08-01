import React from 'react';
import { connect } from 'react-redux';
import Camera from 'react-camera';
import { Link } from 'react-router-dom';
import { addPhoto} from '../actions';
import '../css/camera.css';

class CameraComp extends React.Component {
    state = {
        showCam: true,
        blob: null,
        blobURL: null,
        image: null,
        selectedFile: '',
        photoTitle: '',
        photoUrl: '',
        userdoc: 'photo',
        video: null,
    }

    componentDidMount() {
        this.state.video = this.camera.video;
        console.log('CAMERA MAIN PROPS', this.props);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount gets called in Camera.js');
        this.state.video.srcObject.getTracks().forEach(track => track.stop());
    }

    openCamera =()=>{
		this.setState({showCam: true});
	}

    cancelView = ()=>{
        this.props.history.push('/');
    }

	takePicture = ()=> {
        this.camera.capture()
            .then(blob => {
                const blobURL = URL.createObjectURL(blob);
                //this.img.onload = () => { URL.revokeObjectURL(this.src); }
                this.setState({showCam: false, blob, blobURL});
            })
    }

    handleUpload = (e) => {
        if(this.props.location.fromRoute === 'viewItem'){
            // save photo to aws and db
            this.props.addPhoto({imageURL: this.state.blobURL, imageBlob: this.state.blob, itemId: this.props.location.itemId});
            this.props.history.push(`/items/${this.props.location.itemId}`);
        }
   }

	render() {
        console.log('camera props', this.props);
		return (
			<div className="camera-container">
                <div className="exit" onClick={()=>{this.cancelView()}}>x</div>
				<div className="camera-content">
					{ this.state.showCam ? 
                        <div>
                            <Camera style={style.preview} ref={(cam) => {
                                this.camera = cam;
                            }}>
                                <div style={style.captureContainer} onClick={this.takePicture}>
                                    <div style={style.captureButton} />
                                </div>
                            </Camera>
                            
                        </div> : 
                        <div>
                            <img style={style.captureImage} src={this.state.blobURL}/>
                            <div>
                                <button onClick={()=>{this.setState({showCam: true})}}>Re-take</button>
                                <Link to={{ pathname: `/addItem`, state: { ...this.props.location.addItemState, imageBlob: this.state.blob, imageURL: this.state.blobURL, showModal: false }}}>
                                    Next
                                </Link>
                                {/* <div onClick={(e)=>{this.handleUpload(e)}}>Next</div> */}
                            </div>
                        </div>
	        		}
      		    </div>
			</div>
		);
	}
}

const style = {
  preview: {
    position: 'relative',
    backgroundColor: 'black',
    height: '100vh'
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    border: '2px solid gray',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, { addPhoto })(CameraComp);

// <div>
//                                 <label for='deviceUpload'>Select photo from device: </label>
//                                 <input type="file" accept="image/*" name='deviceUpload' capture="camera" onChange={this.handleUpload} />
//                             </div>
//                             <br/>
//                             <Link to={{ pathname: `/addItem`, state: { blob: null, blobURL: null }}}><button className="skip-photo">Review without a photo</button></Link>