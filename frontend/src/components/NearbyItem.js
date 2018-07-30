import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { searchNearby, addDistance } from '../actions';
import '../css/itemlist.css';
const promises = [];
class NearbyItem extends React.Component {
    state = {
        lat: null,
        long: null,
        distances: [],
        getDistance: null
    }

   getAverageRating = (ratings) => {
      let total = 0;
      let rating = '';
      ratings.forEach(({rating}) => {
         total += rating;
      });
      rating = (total / ratings.length).toString().slice(0, 3);
      if(rating.length < 2){
         rating += '.0';
      }
      return rating;
   }

   componentDidMount() {
      // get current location and search nearby top dishes
      if(this.props.nearbyItems.length === 0){
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
               const { latitude, longitude } = position.coords;
               this.setState({ userLat: latitude, userLong: longitude }, ()=>{
                  // search nearby restaurants
                  this.props.searchNearby(this.state.userLat, this.state.userLong);
               })
            });
         } else console.log("Geolocation is not supported by this browser");
      }
   }

	render() {
		return (
			<div className="item-list">
			   <div className="title">Top dishes near you</div>
            { !this.props.nearbyLoading ? 
               this.props.nearbyItems.map((item, index) => {
                  return (
                     <Link className="link" key={item._id} to={`/items/${item._id}`}>
                        <div className="item" key={item.id}>
                           <div className="image">
                              {item.photos.length > 0 ? <img src={item.photos[0].url}/> : <img src='/assets/no_image.png'/>}
                           </div>
                           <div className="description">
                              <div className="desc-top">
                                 <div className="name">{index + 1}. {item.name}</div>
                                 <i className="material-icons">star</i>
                                 <div className="avg-rating">{this.getAverageRating(item.ratings)}</div>

                              </div>
                              
                              {/*item.location.distance ? <div className="distance">{(item.location.distance / 1609).toFixed(2)} miles away</div> : null */}
                              <div className="desc-bottom">
                              <div className="rest-name">{item.place.name}</div>
                              <div className="address">{item.place.formatted_address}</div>
                              {item.distance ? <div className="distance">{(item.distance * 0.621371).toString().split('').splice(0, (item.distance * 0.621371).toString().split('').indexOf('.') + 2)} mi</div> : null }
                              </div>
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

export default connect(mapStateToProps, { searchNearby, addDistance })(NearbyItem);