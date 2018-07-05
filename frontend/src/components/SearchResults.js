import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import {  } from '../actions/index';
import ItemModal from './ItemModal';
import Rate from './Rate';

class SearchResults extends React.Component {
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
        
		return (
            <Filters />
            <br />
            { venue.menus ? 
                <div className="item-list">
                    {venue.menus.map((item, i) => {
                        return <ItemModal venue={venue.id} item={item} index={i}/>
                    })}
                </div> 
            : <div>No menu available...add what you ate!</div> }
        );
    }
}

const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(SearchResults);
