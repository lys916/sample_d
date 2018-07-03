import React, { Component } from 'react';
import axios from 'axios';
import shortid from 'shortid';
import {
    Button,
    Modal,
    OverlayTrigger,
    Image,
    Panel,
    Glyphicon,
    Tooltip,
} from 'react-bootstrap';
import Rate from './Rate';
import Rating from './Rating';

class ItemModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            imageUrl: this.props.item.imageUrl,
            itemName: this.props.item[0],
            itemPrice: this.props.item[1],
            itemId: '',
        };
    }

    handleFileUpload = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    handleFileSubmit = jobdocument => {
        const fileName =
            jobdocument === 'offerUrl' ? 'offerFile' : 'rejectionFile';
        const { currentJobId } = this.state;
        const config = {
            headers: {
                currentJobId,
                jobdocument,
            },
        };
        const data = new FormData();
        data.append('file', this.state[fileName]);
        data.append('name', this.state[fileName].name);
        // axios.post(`${ROOT_URL}/jobfiles`, data, config)
        //   .then(url => {
        //     this.setState({ [jobdocument] : url });
        //     console.log('job file upload successful for', jobdocument);
        //   })
        //   .catch(err => console.log(err));
    };

    handleAddJob = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const body = this.state;
        // axios
        //   .post(`${ROOT_URL}/jobs`, {
        //     status: body.timelineSelection,
        //     token
        //   })
        //   .then(job => {
        //     console.log('job in handleAddJob is', job);
        //     this.setState({ currentJobId : job.data._id })
        //   })
        //   .then(() => { if (this.state.rejectionFile) this.handleFileSubmit('rejectionUrl'); })
        //   .then(() => { if (this.state.offerFile) this.handleFileSubmit('offerUrl'); })
        //   .then(() => this.setState({ show: false }))
        //   .then(() => this.props.getAllJobs())
        //   .catch(err => console.log({ error: err}));
    };

    handleChange = e => {
        const change = e.target.value;
        this.setState({ [e.target.id]: change });
    };

    render() {
        const tooltip = <Tooltip id="modal-tooltip">Rate this!</Tooltip>;

        return (
            <div className="itemModal">
                <OverlayTrigger overlay={tooltip} onClick={() => this.setState({ show: true })}>
                    {this.state.imageUrl ? (
                        <div className="item-with-image">
                            <Image src={this.state.imageUrl} />
                            <div className="item-right">
                                <Panel>
                                    <Panel.Body>
                                        <h3>{this.state.itemName}</h3>
                                        <h3>{this.state.itemPrice}</h3>
                                    </Panel.Body>
                                </Panel>
                            </div>
                        </div>
                    ) : (
                        <Panel>
                            <h3>{this.state.itemName}</h3>
                            <h3>{this.state.itemPrice}</h3>
                        </Panel>
                    )}
                </OverlayTrigger>
                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                >
                    <Modal.Body>
                        <div className="top-image-modal">
                            <Image src={this.state.imageUrl} />
                        </div>
                        <h2>{this.state.itemName}</h2>
                        <Rating itemId={this.state.itemId} />
                        <Rate />
                        <div className="characteristic-icons">
                            <OverlayTrigger 
                                overlay={<Tooltip>Good value for the $$</Tooltip>}
                                delayHide={150}
                            >
                                <Glyphicon glyph="usd" />
                            </OverlayTrigger>
                            <OverlayTrigger 
                                overlay={<Tooltip>Spicy!</Tooltip>}
                                delayHide={150}
                            >
                                <Glyphicon glyph="fire" />
                            </OverlayTrigger>
                            <OverlayTrigger 
                                overlay={<Tooltip>Instagrammable</Tooltip>}
                                delayHide={150}
                            >
                                <Glyphicon glyph="camera" />
                            </OverlayTrigger>
                            <OverlayTrigger 
                                overlay={<Tooltip>Inedible!</Tooltip>}
                                delayHide={150}
                            >
                                <Glyphicon glyph="trash" />
                            </OverlayTrigger>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleRating}>Rate</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ItemModal;
