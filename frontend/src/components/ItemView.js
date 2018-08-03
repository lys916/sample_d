import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';
import { getItem, addPhoto, addRating} from '../actions';
import { getAverageRating } from '../helper-functions';
import AddReviewModal from './AddReviewModal';
import AddButton from './AddButton';
import AddReview from './AddReview';
import AddPhotoModal from './AddPhotoModal';
import '../css/view_item.css';

class ItemView extends React.Component {

	state = {
		showReviewModal: false,
		photoIndex: 0,
		addRating: false,
		rating: '',
		review: '',
		mapSet: false,
		showPhotoModal: false
	};
	
	componentDidMount(){
		this.props.getItem(this.props.match.params.id);
		console.log('MAIN PROPS', this.props);
		console.log('itemview mounted');
		console.log('map-container in componentDidMount', document.getElementById("map-container"))
		
	}

	static getDerivedStateFromProps(props, state){
		if(!state.mapSet){
			const item = props.viewItem;
			if(item.loc.coordinates.length > 1){
		   	const myLatlng = new window.google.maps.LatLng(item.loc.coordinates[1],item.loc.coordinates[0]);
				const mapOptions = {
					zoom: 16,
					center: myLatlng
				}
				console.log('DERIVED PROPS', props);
				console.log('MAP CONTAINER', document.getElementById("map-container"));

				const map = new window.google.maps.Map(document.getElementById("map-container"), mapOptions);

				const marker = new window.google.maps.Marker({
				    position: myLatlng,
				    title:"Test title"
				});

		   	marker.setMap(map);
		   	return state.mapSet = true;
			}
		}
		return state;
		
	}


	componentDidUpdate(){
		console.log('itemview did update');
	}

	componentWillUnmount(){
		console.log('itemview unmount');
	}

	toggleModal = (modal)=>{
		if(modal === 'review'){
			this.setState({showReviewModal: !this.state.showReviewModal});
		}
		if(modal === 'photo'){
			this.setState({showPhotoModal: !this.state.showPhotoModal});
		}

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
			const itemData = {
				itemId: this.props.viewItem._id,
				rating: this.state.rating,
				review: this.state.review,
				fromRoute: 'viewItem'
			}
			this.setState({rating: '', review: '', addRating: !this.state.addRating});
			this.props.addRating(itemData, this.props.history);
		} 
	}

	handleUpload = (e) => {
	   const file = e.target.files[0];
	   const blobURL = URL.createObjectURL(file);
	   this.setState({showPhotoModal: false }, ()=>{
	   });
     	this.props.addPhoto({imageURL: blobURL, imageBlob: file, itemId: this.props.match.params.id});
   }

	render() {
		const item = this.props.viewItem;
		console.log('props', this.props);
		const highlights = this.props.viewItem.reviews.filter(review=>{
			return review.text !== '';
			
		});
		return (
			<div className="item-view">
				<AddReviewModal 
					history={this.props.history} 
					previousRoute={'itemView'} 
					toggle={this.toggleModal} 
					show={this.state.showReviewModal} 
					item={this.props.viewItem}/>
				<div className="image">
					<AddPhotoModal 
						show={this.state.showPhotoModal} 
						toggle={this.toggleModal} 
						handleUpload={this.handleUpload } 
						fromRoute="viewItem" 
						itemId={this.props.match.params.id}/>
					<div onClick={()=>{this.toggleModal('photo')}}>
						<AddButton style={addButtonStyle} />
					</div>
					<div className="arrow" onClick={()=>{this.viewNextImage('prev')}}><i className="material-icons">keyboard_arrow_left</i></div>
					{item.photos.length > 0 ? <img src={item.photos[this.state.photoIndex].url} /> : <img src="/assets/no_image.png" /> }
					<div className="arrow" onClick={()=>{this.viewNextImage('next')}}><i className="material-icons">keyboard_arrow_right</i></div>
				</div>

				<div className="dish-info">
					<div className='rating-name-container'>
						<h4 className="item-name">{item.name}</h4>
						<div className="rating-container">
							<div className="rating">{item.totalRating ? (item.totalRating / item.reviews.length) : null}</div>
							<i className="material-icons">star</i>
						</div>
					</div>
					<div className="place-name">{item.place.name}</div>
					<div className="address">{item.place.formatted_address}</div>
					<div className="phone">{item.place.formatted_phone_number}</div>
				</div>
				<div className="rate-review" >
					<div className="flip-button" onClick={this.addRatingReview}>
						<div className="button">Add rating and review</div>
						<i className="material-icons">{this.state.addRating ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
					</div>
				</div>

				{/*RATE AND REVIEW COMPONENT*/}
				{this.state.addRating ? 
					<form onSubmit={(event) => { this.handleSubmit(event) }}>
						<AddReview ratingChanged={this.ratingChanged} handleOnChange={this.handleOnChange} rating={this.state.rating} value={this.state.value}/>
						<button className="submit-review" type="submit">Submit</button>
					</form> 
				: null}

				<div id="map-container"></div>
				<div className="reviews">
					<h4 className="highlights">Review Highlights</h4>
					{
						highlights.map(review=>{
							return (
								<div className="review" key={review._id}>
									<div className="rating-container">
									<div className="rating">{review.rating}</div>
									<i className="material-icons">star</i>
									</div>
									{review.text ? <div>{review.text}</div> : null}
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
		right: '4px',
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

export default connect(mapStateToProps, { getItem, addPhoto, addRating })(ItemView);