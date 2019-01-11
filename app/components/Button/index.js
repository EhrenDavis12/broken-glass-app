/**
 *
 * Button
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Button(props) {
  return (
    <div className='btn btn-primary'>
      {props.message}
    </div>
  );
}

Button.propTypes = {};

export default Button;
