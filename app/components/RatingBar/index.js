/**
 *
 * RatingBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
//import { StyledRatingBar } from "./StyledRatingBar";
import Star from "../Star/index";


/* eslint-disable react/prefer-stateless-function */
class RatingBar extends React.Component {

  Click = (Rating) => {
    if (!this.props.ReadOnly) {
      this.props.onClick(Rating, this.props.RatingFor);
    }
  }

  render() {
    return (
      <div style={{minWidth: 140}}>
        <Star Id='1' Color={this.props.Rating >= 1 ? '#ffff00': ''} Selected={this.props.Rating >= 1} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='2' Color={this.props.Rating >= 2 ? '#ffff00': ''} Selected={this.props.Rating >= 2} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='3' Color={this.props.Rating >= 3 ? '#ffff00': ''} Selected={this.props.Rating >= 3} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='4' Color={this.props.Rating >= 4 ? '#ffff00': ''} Selected={this.props.Rating >= 4} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='5' Color={this.props.Rating >= 5 ? '#ffff00': ''} Selected={this.props.Rating >= 5} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
      </div>
    );
  }
}

RatingBar.propTypes = {};

export default RatingBar;
