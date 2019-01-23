/**
 *
 * InputText
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import StyledInputText from './StyledInputText';


function InputText(props) {

  const onChange = (event) =>{
    props.onChangeComment(event.target.value, props.RatingFor);
  }

  let Input = (
    <StyledInputText
      type='text'
      style={{ width: '100%', height: '25' }}
      rows='3'
      className='disabled border'
      defaultValue={props.Text}
      readOnly={props.ReadOnly}
      onChange={onChange}
    />
  )

  return Input;
}

InputText.propTypes = {
  ReadOnly: PropTypes.bool,
  Text: PropTypes.string
};

export default InputText;
