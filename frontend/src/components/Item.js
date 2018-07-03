import React from 'react';
import { connect } from 'react-redux';

class Item extends React.Component {

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