import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';
import { getItem} from '../actions';
import { getAverageRating } from '../helper-functions';
import AddReviewModal from './AddReviewModal';
import AddButton from './AddButton';
import AddReview from './AddReview';
import '../css/view_item.css';

class ItemView extends React.Component {

	state = {
		showModal: false,
		photoIndex: 0,
		addRating: false,
		rating: '',
		review: '',
		mapSet: false
	};
	
	componentDidMount(){
		this.props.getItem(this.props.match.params.id);
	
		console.log('itemview mounted');
		console.log(document.getElementById("map-container"))
		
	}

	static getDerivedStateFromProps(props, state){
		if(!state.mapSet){
			const item = props.viewItem;
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

		   	marker.setMap(map);
		   	return state.mapSet = true;
			}
		}
		
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

	toggleModal = ()=>{
		this.setState({showModal: !this.state.showModal});
	}

	handleOnChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	ratingChanged = (rating)=>{
		this.setState({rating});
	}

	viewNextImage = (direction)=>{
		if(direction === 'prev' && this.state.photoIndex !== 0){
			this.setState({photoIndex: this.state.photoIndex - 1});
		}
		if(direction === 'next' && this.state.photoIndex !== this.props.viewItem.photos.length - 1){
			this.setState({photoIndex: this.state.photoIndex + 1});
		}
	}
	addRatingReview = ()=>{
		this.setState({addRating: !this.state.addRating});
	}

	// 'handleSubmit' will send item data over to action 'add item'
	handleSubmit = (event) => {
		event.preventDefault();

		if (this.props.viewItem._id) {
			// create new review for this dish
			// send item data to action
			const itemId = this.props.viewItem._id;
			const rating = this.state.rating;
			const review = this.state.review;
			alert('In process of changing the backend model, wait after the backend is done then save this rating and review.');

			// this.props.addRating({id, rating, review});
		} 
		this.setState({rating: '', review: ''});
	}

	render() {
		const item = this.props.viewItem;
		console.log('props', this.props);
		return (
			<div className="item-view">

				<AddReviewModal history={this.props.history} previousRoute={'itemView'} toggle={this.toggleModal} show={this.state.showModal} item={this.props.viewItem}/>

				<div className="image">
					<AddButton style={addButtonStyle} />
					<div className="arrow" onClick={()=>{this.viewNextImage('prev')}}><i className="material-icons">keyboard_arrow_left</i></div>
					{item.photos.length > 0 ? <img src={item.photos[this.state.photoIndex].url} /> : <img src="/assets/no_image.png" /> }
					<div className="arrow" onClick={()=>{this.viewNextImage('next')}}><i className="material-icons">keyboard_arrow_right</i></div>
				</div>

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
				<div className="rate-review" >
					<div className="flip-button" onClick={this.addRatingReview}>
						<div className="button">Add rating and review
						</div>
						<i className="material-icons">{this.state.addRating ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
					</div>
				</div>

				{/*RATE AND REVIEW COMPONENT*/}
				{
					this.state.addRating ? 
					<form onSubmit={(event) => { this.handleSubmit(event) }}>
						<AddReview ratingChanged={this.ratingChanged} handleOnChange={this.handleOnChange} rating={this.state.rating} value={this.state.value}/>
						<button className="submit-review" type="submit">Submit</button>
					</form> : null
				}

				<div id="map-container"></div>
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

const addButtonStyle = {
	button: {
		background: '#DE3734',
		height: '35px',
		width: '35px',
		position: 'absolute',
		color: 'white',
		bottom: '0',
		right: '0',
		borderRadius: '100%',
		margin: '5px',
		boxShadow: '2px 3px 4px #bbbbbb'
	},
	icon: {
		fontSize: '23px',
		marginTop: '5px'
	},
	iconImage: 'add_a_photo'

}

const mapStateToProps = (state) => {
	return {
		viewItem: state.items.viewItem
	} 
}

export default connect(mapStateToProps, { getItem })(ItemView);