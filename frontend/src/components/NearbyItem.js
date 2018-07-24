import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { searchNearby } from '../actions';
import '../css/nearby.css'

class NearbyItem extends React.Component {
   state = {
      lat: null,
      long: null
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
			<div className="nearby">
			   <div>Try these dishes near you</div>
            {
               this.props.nearbyItems.map(item => {
                  return (
                     <div className="nearby-item">
                        <div className="image">
                           <img src={item.photos[0].url} />
                        </div>
                        <div>{item.name}</div>
                        <div>{item.restaurantName}</div>
                     </div>
                  );
               })
            }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
      nearbyItems: state.items.nearbyItems
	} 
}

export default connect(mapStateToProps, { searchNearby })(NearbyItem);