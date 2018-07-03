import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { getMenu } from '../actions/index';
import ItemModal from './ItemModal';
import Rate from './Rate';

class Venue extends React.Component {
    state = {
        venue: '',
        detail: {},
        items: []
    }
    componentDidMount() {
        const venueId = this.props.match.params.id;
        this.props.getMenu(venueId);
    }

    render() {
        if(this.props.venues.length < 1){
            this.props.history.push('./');
        }

        let venue = {};
        let v = this.props.venues;
        for (let i = 0; i < this.props.venues.length; i++) {
            if(v[i].id === this.props.match.params.id){
                venue = v[i];
                break;
            }
        }
        
        console.log('VENUE DETAIL + MENU', venue);
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Image src={venue.bestPhotoPrefix + 'height300' + venue.bestPhotoSuffix} responsive />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h2 className='venue-title'>{venue.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Rate from={'venue'} />
                    </Col>
                </Row>
                { venue.menus ? 
                    <div className="item-list">
                        {venue.menus.map(item => {
                            return <ItemModal item={item}/>
                        })}
                    </div> 
                : <div>No menu available...add what you ate!</div> }
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
