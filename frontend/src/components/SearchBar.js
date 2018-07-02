import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="search-bar">
					<form>
						<input placeholder="Search" />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	} 
}

export default connect(mapStateToProps, {  })(SearchBar);