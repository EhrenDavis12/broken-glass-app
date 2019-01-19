/**
 *
 * InputDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function InputDropdown(props) {
  return (
    <select disabled={props.ReadOnly}>
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
};

export default InputDropdown;
