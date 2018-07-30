import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';
import { getItem} from '../actions';
import { getAverageRating } from '../helper-functions';
import '../css/view_item.css';

class ItemView extends React.Component {

	state = {};
	
	componentDidMount(){
		this.props.getItem(this.props.match.params.id);
		console.log('itemview mounted');
		console.log(document.getElementById("map-container"))
		
	}

	componentWillMount(){
		console.log('itemview will mount');
	}

	componentDidUpdate(){
		console.log('itemview did update');
	}

	componentWillUnmount(){
		console.log('itemview unmount');
	}

	displayMap = ()=>{
		console.log('getting map', document.getElementById("map-container"));
		const item = this.props.viewItem;
		if(item.loc.coordinates.length > 1){
	   	var myLatlng = new window.google.maps.LatLng(item.loc.coordinates[1],item.loc.coordinates[0]);
			var mapOptions = {
			  zoom: 16,
			  center: myLatlng
			}
			var map = new window.google.maps.Map(document.getElementById("map-container"), mapOptions);

			var marker = new window.google.maps.Marker({
			    position: myLatlng,
			    title:"Test title"
			});
			console.log('marker', marker);
	   	marker.setMap(map);
		}
	}

	render() {
		const item = this.props.viewItem;
		return (
			<div className="item-view">
				<div className="image">{item.photos.length > 0 ? <img src={item.photos[0].url} /> : null }</div>
				<div className="dish-info">
					<div className="item-name">{item.name}</div>
					<div className="rating-container">
						<div className="rating">{getAverageRating(item.ratings)}</div>
						<i className="material-icons">star</i>
					</div>
					<div className="place-name">{item.place.name}</div>
					<div className="address">{item.place.formatted_address}</div>
					<div className="phone">{item.place.formatted_phone_number}</div>
				</div>
				<div className="rate-review"><button>Add rating and review</button></div>
				<div id="map-container">{this.displayMap()}</div>
				<div className="reviews">
					<div className="highlights">Review Highlights</div>
					{
						this.props.viewItem.ratings.map(rating=>{
							return (
								<div className="review">
									<div className="rating-container">
									<div className="rating">{rating.rating}</div>
									<i className="material-icons">star</i>
									</div>
									{rating.review ? <div>{rating.review}</div> : null}
								</div>
							)
							
						})
					}
				</div>
				<div className="break-space"></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		viewItem: state.items.viewItem
	} 
}

export default connect(mapStateToProps, { getItem })(ItemView);