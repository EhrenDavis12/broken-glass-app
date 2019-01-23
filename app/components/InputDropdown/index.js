/**
 *
 * InputDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function InputDropdown(props) {

  const onChange = (event) =>{
    console.log(event.target.value);
    props.onChangeComment(event.target.value, props.RatingFor);
  }

  return (
    <select disabled={props.ReadOnly} onChange={onChange}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  );
}

InputDropdown.propTypes = {
  Options: PropTypes.arrayOf(PropTypes.object),
  ReadOnly: PropTypes.bool,
  RatingFor: PropTypes.string,
  onChangeComment: PropTypes.func,
};

export default InputDropdown;
