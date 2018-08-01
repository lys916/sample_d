import React from 'react';
import ReactStars from 'react-stars';
import { FormGroup, FormControl } from 'react-bootstrap';
import '../css/iteminput.css';

const AddReview = (props)=>{
  return (
      <div className="add-review">
         <ReactStars className="star-rating" count={5} onChange={props.ratingChanged} size={45} color2={'orange'} value={Number(props.rating)}/>
         <br/>
         <FormGroup controlId="formControlsTextarea">
            <FormControl className="review-input" componentClass="textarea" placeholder="Enter your review" onChange={props.handleOnChange} name="review" value={props.review} />
          </FormGroup>
      </div>
   );
}
export default AddReview;
