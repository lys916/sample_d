import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const AddButton = (props)=>{
  return (
      <div className="add-button" style={props.style.button}>
         <i className="material-icons" style={props.style.icon}>{props.style.iconImage}</i>
      </div>
   );
}
export default AddButton;
