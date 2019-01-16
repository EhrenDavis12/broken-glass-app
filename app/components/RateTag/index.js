/**
 *
 * RateTag
 *
 */

import React from 'react';
import RatingBar from "components/RatingBar/index";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


/* eslint-disable react/prefer-stateless-function */
class RateTag extends React.PureComponent {
  constructor(props){
    super(props);
    this.Label = props.Label;
  }
  render() {
    return (
      <div className='row'>
        <div className="col-sm-2">
          <label>{this.Label} </label>
        </div>
        <div className='col-sm-8'>
          <input type='text' style={{ width: '100%', height: '25' }} rows='5' className='disabled border' readOnly />
        </div>
        <div className='col-sm-2'>
          <RatingBar />
        </div>
      </div>
    );
  }
}

RateTag.propTypes = {};

export default RateTag;
