/**
 *
 * RatingBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Star from "../Star/index";


/* eslint-disable react/prefer-stateless-function */
class RatingBar extends React.Component {
  render() {
    return (
      <div>
        <Star Color='#ffff00'/>
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
    );
  }
}

RatingBar.propTypes = {};

export default RatingBar;
