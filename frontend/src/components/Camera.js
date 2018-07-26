import React from 'react';
import { connect } from 'react-redux';
import Camera from 'react-camera';
import { Link } from 'react-router-dom';

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
    }

    componentWillUnmount() {
        this.state.video.srcObject.getTracks().forEach(track => track.stop());
    }

    openCamera =()=>{
		this.setState({showCam: true});
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
        const file = e.target.files[0];
        const blobURL = URL.createObjectURL(file);
        this.setState({ showCam: false, blob: file, blobURL });
    }

	render() {
		return (
			<div className="camera-container">
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
                            <div>
                                <label for='deviceUpload'>Select photo from device: </label>
                                <input type="file" accept="image/*" name='deviceUpload' capture="camera" onChange={this.handleUpload} />
                            </div>
                            <br/>
                            <Link to={{ pathname: `/addItem`, state: { blob: null, blobURL: null }}}><button className="skip-photo">Review without a photo</button></Link>
                        </div> : 
                        <div>
                            <img style={style.captureImage} src={this.state.blobURL}/>
                            <div>
                                <button onClick={()=>{this.setState({showCam: true})}}>Re-take</button>
                                <Link to={{ pathname: `/addItem`, state: { blob: this.state.blob, blobURL: this.state.blobURL }}}>Next
                                </Link>
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

export default connect(mapStateToProps, {  })(CameraComp);