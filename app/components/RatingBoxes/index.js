/**
 *
 * RatingBox
 *
 */

import React from 'react';
import RatingBox from "containers/RatingBox/Loadable"
import PropTypes from 'prop-types';
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class RatingBoxes extends React.Component {
  render() {
    const { Reviews } = { ...this.props };
    console.log(Reviews);
    if (Reviews === null || Reviews.length <= 0) {
      return (<h1>No Reviews</h1>);
    }
    else {
      return (
        <div>
          {Reviews.map(review => (
            <RatingBox
              key={review.uuid}
              Review={review}
              ReadOnly={true}
              PayDropDownOptions={null}
              JobDropDownOptions={null}
            />))}
        </div>
      );
    }
  }
}

RatingBoxes.propTypes = {
  Reviews: PropTypes.array,
};

export default RatingBoxes;
