import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/itemlist.css'

class SearchItem extends React.Component {
   state = {
      lat: null,
      long: null
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

   getItemDistance = (lat, long) => {
      return '1.3';
   }

   componentDidMount() {

   }

	render() {
      console.log(this.props.searchItems);
		return (
			<div className="item-list">
			   { this.props.searchItems.length > 0 ? <div className="title">Search results</div> : null }
            { !this.props.searchLoading ? 
               this.props.searchItems.map((item, index) => {
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
                                 <div className="avg-rating">{item.totalRatings / item.reviews.length}</div>

                              </div>
                              
                              {/*item.location.distance ? <div className="distance">{(item.location.distance / 1609).toFixed(2)} miles away</div> : null */}
                              <div className="desc-bottom">
                              <div className="rest-name">{item.place.name}</div>
                              <div className="address">{item.place.formatted_address}</div>
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
      searchItems: state.items.searchItems,
      searchLoading: state.items.searchLoading
	} 
}

export default connect(mapStateToProps, { })(SearchItem);