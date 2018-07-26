import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/itemlist.css'

class SearchPlaces extends React.Component {
   state = {
      term: ''
   }

   componentDidMount(){
      const input = document.getElementById('pac-input');

      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function() {
         const place = autocomplete.getPlace();
         console.log(place);
      });
   }

   handleChange = (event)=>{
      this.setState({[event.target.name]: event.target.value});
   }

	render() {

		return (
			<div className="search-places">

			  <input id="pac-input" name="term" onChange={this.handleChange} placeholder="enter city & restaurant name" value={this.state.term} style={{width: '400px'}}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
      // searchItems: state.items.searchItems,
      // searchLoading: state.items.searchLoading
	} 
}

export default connect(mapStateToProps, { })(SearchPlaces);