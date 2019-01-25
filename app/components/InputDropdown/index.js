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
    props.onChangeComment(event.target.value, props.RatingFor);
  }

  const dropDownOptions = () => props.DropDownOptions.map(opt => (<option key={opt.id} value={opt.Id}>{opt.Text}</option>))

  return (
    <select disabled={props.ReadOnly} onChange={onChange}>
    <option value={0}>Pick one</option>
    {dropDownOptions()}
    </select>
  );
}

InputDropdown.propTypes = {
  Options: PropTypes.arrayOf(PropTypes.object),
  ReadOnly: PropTypes.bool,
  RatingFor: PropTypes.string,
  onChangeComment: PropTypes.func,
  DropDownOptions: PropTypes.array,
};

export default InputDropdown;
