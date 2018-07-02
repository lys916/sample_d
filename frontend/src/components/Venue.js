import React from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Row,
    Col,
    ToggleButtonGroup, 
    DropdownButton,
    Button, 
    Modal, 
    OverlayTrigger, 
    Radio, 
    MenuItem, 
    Glyphicon, 
    Tooltip, 
    Checkbox, 
    FormControl,
    FormGroup,
    ControlLabel,
  } from 'react-bootstrap';
import ItemList from './ItemList';
import Rate from './Rate';

class Venue extends React.Component {
    

	render() {
		return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Image src={} responsive />
                        <h2 className='venue-title'>{}</h2>
                        <Rate value={}/>
                    </Col>
                </Row>
                <ItemList />
            </Grid>
			<div className="container">
				<div className="venue">
                    <img />
                    <h2 className='venue-title' />

					<div className="item-list">
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(Venue);