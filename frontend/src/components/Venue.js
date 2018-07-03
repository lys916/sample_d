import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { getVenueDetail } from '../actions/index';
import Item from './Item';
import Rate from './Rate';

class Venue extends React.Component {
    state = {
        imageUrl : 'https://s3-media3.fl.yelpcdn.com/bphoto/mNa8XQ7MtY0usvTV3v1sCA/o.jpg',
        venueName : 'Aburi Sushi',
    }
    componentDidMount(){
        const venueId = this.props.match.params.id;
        this.props.getVenueDetail(venueId);
        console.log('ID', venueId);
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

export default connect(mapStateToProps, { getVenueDetail })(Venue);