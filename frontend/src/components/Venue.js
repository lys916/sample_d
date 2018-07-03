import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Row, Col, Image } from 'react-bootstrap';
// import { getVenueDetail } from '../actions/index';
import ItemModal from './ItemModal';
import Rate from './Rate';

const detailURL = 'https://api.foursquare.com/v2/venues';
const clientId = 'EI3GHFP5FIFERWKVR2SYXSTOO4BKYZV33CLRVCHSCCKZJ0DF';
const clientSecret = 'MG3Z0KQILIDDRIOCIWFMUDVF4QWL5C5RTVZDYS0SON5ZLAHF';

class Venue extends React.Component {
    state = {
        venue: {},
        detail: {},
        items: []
    }
    componentDidMount(){
        console.log('params id is', this.props.match.params.id);
        this.setState({ venue : this.props.venues[this.props.match.params.id] }, () => {
            const qs = { 
                client_id: clientId, 
                client_secret: clientSecret,
                v: '20180702'
            }
    
            axios.get(`${detailURL}/${this.state.venue.id}/menu`, {params: qs})
                .then(res => {
                    console.log('RES MENU', res);
                    const menuItems = [];
                    const menu = res.data.response.menu.menus.items;
                    const traverseMenu = (items) => {
                        items.forEach(item => {
                            if (item.entries) traverseMenu(items.entries.items);
                            menuItems.push([item.name, item.price]);
                        })
                    }
                    traverseMenu(menu);
                    this.setState({ items: menuItems });
                });
        });
    }

	render() {
		return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Image src={this.state.venue.bestPhotoPrefix + 'height300' + this.state.venue.bestPhotoSuffix} responsive />
                        <h2 className='venue-title'>{this.state.venue.name}</h2>
                        <Rate from={'venue'} />
                    </Col>
                </Row>
                <div className="item-list">
                    {this.props.items.map(item => {
                        return <ItemModal item={item}/>
                    })}
                </div>
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

export default connect(mapStateToProps, { })(Venue);