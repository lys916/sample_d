import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { searchNearby } from '../actions';
import '../css/itemlist.css'

class NearbyItem extends React.Component {
   state = {
      lat: null,
      long: null
   }

   getAverageRating = (ratings) => {
      return '4.5';
   }

   getItemDistance = (lat, long) => {
      return '1.3';
   }

   componentDidMount() {
      // get current location and search nearby top dishes
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
            this.setState({ lat: latitude, long: longitude }, ()=>{
               // search nearby restaurants
               this.props.searchNearby(this.state.lat, this.state.long);
            })
         });
      } else console.log("Geolocation is not supported by this browser");
   }

	render() {

		return (
			<div className="item-list">
			   <div>Try these dishes near you</div>
            { !this.props.nearbyLoading ? 
               this.props.nearbyItems.map((item, index) => {
                  return (
                     <Link className="link" key={item.id} to={`/items/${item.id}`}>
                        <div className="item" key={item.id}>
                           <div className="image">
                              <img src={item.photos[0].url}/>
                           </div>
                           <div className="description">
                              <div className="name">{index + 1}. {item.name}</div>
                              <div className="avg-rating">Rating: {this.getAverageRating(item.ratings)}</div>
                              <div className="distance">{this.getItemDistance(item.lat, item.long)} miles away</div>
                              {/*item.location.distance ? <div className="distance">{(item.location.distance / 1609).toFixed(2)} miles away</div> : null */}
                              <div className="address">123 Main st, Fairfield</div>
                           </div>
                        </div>
                     </Link>
                  );
               }) : <div>Loading...</div>}

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
      nearbyItems: state.items.nearbyItems,
      nearbyLoading: state.items.nearbyLoading
	} 
}

export default connect(mapStateToProps, { searchNearby })(NearbyItem);