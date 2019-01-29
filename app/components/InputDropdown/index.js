/**
 *
 * InputDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Option = styled.option`
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
background: gray;
`;
const Select = styled.select`
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
background: #b3b3aa;
display: inline-block;
  box-sizing: border-box;
  padding: 0.25em .5em;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid white;
width:100%;
`;

function InputDropdown(props) {

  const onChange = (event) =>{
    props.onChangeComment(event.target.value, props.RatingFor);
  }

  const dropDownOptions = () => props.DropDownOptions.map((opt,i) => (<option key={opt.id} value={opt.Id}>{opt.Text}</option>))

  return (
    <Select disabled={props.ReadOnly} onChange={onChange}>
    <Option value={0}>Pick one</Option>
    {dropDownOptions()}
    </Select>
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
