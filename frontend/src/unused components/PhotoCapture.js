import React from 'react';
import { connect } from 'react-redux';

class PhotoCapture extends React.Component {
    state = {
        videoSrc: '',
    }

    componentDidMount() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
    }
    handleVideo = (stream) => {
        this.setState({ videoSrc: window.URL.createObjectURL(stream) });
        this.videoElement.play();
    }
    videoError() { }
    
    render() {
        return (
            <div>
                <video 
                    id="video" 
                    width="640" 
                    height="480" 
                    className="cameraFrame" 
                    src={this.state.videoSrc} 
                    autoPlay="true"
                    ref= {(input) => { this.videoElement = input }}
                >
                </video>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(PhotoCapture);