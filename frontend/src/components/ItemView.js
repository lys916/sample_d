import React from 'react';
import { connect } from 'react-redux';
import { venues } from '../dummy-data';
import { Link } from 'react-router-dom';
import { getItem} from '../actions';

class ItemView extends React.Component {
	
	componentDidMount(){
		this.props.getItem(this.props.match.params.id);
	}

	render() {
		console.log(this.props.viewItem)
		return (
			<div className="item-view">
				<h2>{this.props.viewItem.name}</h2>
				<div>{this.props.viewItem.photos.length > 0 ? <img src={this.props.viewItem.photos[0].url} /> : null }</div>
				<div className="add-review"><button>Add review</button></div>
				<div className="reviews">
					{
						this.props.viewItem.ratings.map(rating=>{
							return (
								<div className="review">
									<div className="rating">rating: {rating.rating}</div>
									{rating.review ? <div>review: {rating.review}</div> : null}
								</div>
							)
							
						})
					}
				</div>

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