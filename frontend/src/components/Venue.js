import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Row, Col, Image } from 'react-bootstrap';
// import { getVenueDetail } from '../actions/index';
import Item from './Item';
import Rate from './Rate';

const detailURL = 'https://api.foursquare.com/v2/venues';
const clientId = 'EI3GHFP5FIFERWKVR2SYXSTOO4BKYZV33CLRVCHSCCKZJ0DF';
const clientSecret = 'MG3Z0KQILIDDRIOCIWFMUDVF4QWL5C5RTVZDYS0SON5ZLAHF';

class Venue extends React.Component {
    state = {
        detail: {},
        menus: []
    }
    componentDidMount(){
        const venueId = this.props.match.params.id;
        // this.props.getVenueDetail(venueId);

        const qs = { 
            client_id: clientId, 
            client_secret: clientSecret,
            v: '20180702'
        }

        axios.get(`${detailURL}/${venueId}`, {params: qs}).then(res => {
         console.log('RES DETAIL', res);
         this.setState({
            detail: res.data.venue
         });
         axios.get(`${detailURL}/${venueId}/menu`, {params: qs}).then(res => {
         console.log('RES MENU', res);
         this.setState({
            menus: res.data.response.menu.menus
         });

        });

       });
    }

	render() {
		return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Image src={this.state.imageUrl} responsive />
                        <h2 className='venue-title'>{this.state.venueName}</h2>
                        <Rate from={'venue'} />
                    </Col>
                </Row>
                <div className="item-list">
                    {
                        this.props.items.map(item=>{
                            return <Item item={item}/>
                        })
                    }
                </div>
            </Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return {
        items: state.items
	} 
}

export default connect(mapStateToProps, { })(Venue);