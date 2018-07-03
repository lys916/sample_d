import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { getMenu } from '../actions/index';
import ItemModal from './ItemModal';
import Rate from './Rate';

class Venue extends React.Component {
    state = {
        venue: {},
        detail: {},
        items: []
    }
    componentDidMount(){
        const venueId = this.props.match.params.id;
        this.props.getMenu(venueId);
    }

	render() {
        if(this.props.venues.length < 1){
            this.props.history.push('./');
        }

        let venue = {};
        this.props.venues.forEach(v=>{
            if(v.id === this.props.match.params.id){
                venue = v;
            }
        });
        console.log('VENUE DETAIL + MENU', venue);
		return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <div className="venue-photo">
                            <Image src={venue.bestPhotoPrefix + 'height300' + venue.bestPhotoSuffix} responsive />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <h2 className='venue-title'>{venue.name}</h2>
                    </Col>
                    <Col xs={12}>
                        <Rate from={'venue'} />
                    </Col>
                </Row>

                { 
                    // venue.menus.count > 0 ? 
                    // <div className="item-list">
                    //     {this.props.items.map(item => {
                    //         return <ItemModal item={item}/>
                    //      })}
                    // </div> : null 
                }
                
            </Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
        items: state.items,
        venues: state.venues,
	} 
}

export default connect(mapStateToProps, { getMenu })(Venue);