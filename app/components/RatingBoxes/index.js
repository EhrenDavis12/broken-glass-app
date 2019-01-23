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
    if (Reviews === null) {
      return (<></>);
    }
    else {
      return (
        <div>
          {Reviews.map(review => (<RatingBox key={review.uuid} Review={review} ReadOnly={true} />))}
        </div>
      );
    }
  }
}

RatingBoxes.propTypes = {
  Reviews: PropTypes.array,
};

export default RatingBoxes;
