import React from 'react';
import { connect } from 'react-redux';

class Item extends React.Component {

	componentDidMount(){
		const venueId = this.props.match.params.id;
		//TODO: make api call using venueId
	}

    render() {
        return (
            <div className="item-detail">
               Item Detail
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    } 
}

export default connect(mapStateToProps, {  })(Item);