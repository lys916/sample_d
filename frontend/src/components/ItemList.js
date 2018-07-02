import React from 'react';
import { connect } from 'react-redux';
import { items } from '../dummy-data';

class ItemList extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="venue">
					<div className="item-list">
						{
							items.map((item, index) => {
								return (
									<div className="item" key={index}>
										<div className="name">{item.name}</div>
										<div className="image">{item.image}</div>
										<div className="description">{item.description}</div>
										<div className="price">{item.price}</div>
										<div className="price">{item.rating}</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(ItemList);