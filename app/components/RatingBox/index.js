/**
 *
 * RatingBox
 *
 */

import React from 'react';
import Button from 'components/Button/index'
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class RatingBox extends React.Component {
  render() {
    return (
      <form className="border p-2">
        <RateTag Label='Job Types ' />
        <RateTag Label='Pay Types ' />
        <RateTag Label='Average Shift $ ' />
        <RateTag Label='Management ' />
        <RateTag Label='Busy ' />
        <RateTag Label='Customers ' />
        <RateTag Label='Over All ' />
        <Button className="button button-primary hidden">Submit</Button>
      </form>
    );
  }
}

RatingBox.propTypes = {};

export default RatingBox;
