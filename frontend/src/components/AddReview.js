import React from 'react';
import ReactStars from 'react-stars';
import { FormGroup, FormControl } from 'react-bootstrap';

const AddReview = (props)=>{
  return (
      <div className="add-review">
         <ReactStars  count={5} onChange={props.ratingChanged} size={35} color2={'#ffd700'} value={Number(props.rating)}/>
         <br/>
         <FormGroup controlId="formControlsTextarea">
            <FormControl componentClass="textarea" placeholder="Enter your review" onChange={props.handleOnChange} name="review" value={props.review} />
          </FormGroup>
      </div>
   );
}
export default AddReview;
