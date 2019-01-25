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

  Click = (Rating) => {
    if (!this.props.ReadOnly) {
      this.props.onClick(Rating, this.props.RatingFor);
    }
  }

  render() {
    return (
      <div>
        <Star Id='1' Selected={this.props.Rating >= 1} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='2' Selected={this.props.Rating >= 2} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='3' Selected={this.props.Rating >= 3} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='4' Selected={this.props.Rating >= 4} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
        <Star Id='5' Selected={this.props.Rating >= 5} ReadOnly={this.props.ReadOnly} onClick={this.Click} />
      </div>
    );
  }
}

RatingBar.propTypes = {};

export default RatingBar;
