import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon, Button } from 'react-bootstrap';
import Camera from 'react-camera';
import { Link } from 'react-router-dom';
import axios from 'axios';
import shortid from 'short-id';

const ROOT_URL = 'http://localhost:5000';

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
    }

    componentDidMount() {
    }

    openCamera =()=>{
		this.setState({showCam: true});
	}

	takePicture = ()=> {
        this.camera.capture()
            .then(blob => {
                //  this.img.src = URL.createObjectURL(blob);
                // let blobToFile = blob;
                // blobToFile.lastModifiedDate = new Date();
                // blobToFile.name = `IMG_${shortid.generate()}`;
                const blobURL = URL.createObjectURL(blob);
                console.log('BLOB & blobURL', blob, blobURL);
                // console.log('blobToFile', blobToFile);
                //  console.log('this.IMAG', this.img.src);
                //this.img.onload = () => { URL.revokeObjectURL(this.src); }
                this.setState({showCam: false, blob, blobURL});
            })
    }


	render() {
		return (
			<div className="camera-container">
				<div>
					<div className="take-a-photo">Take a photo!</div>
					<button className="skip-photo">Skip</button>
				</div>
				<div className="camera-content">
					{ this.state.showCam ? 
                        <div>
                            {/* <Camera onTakePhoto={this.handleImage} /> */}
                            <Camera style={style.preview} ref={(cam) => {
                                this.camera = cam;
                            }}>
                                <div style={style.captureContainer} onClick={this.takePicture}>
                                    <div style={style.captureButton} />
                                </div>
                            </Camera>
                            <button>Select photo from gallery</button>
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