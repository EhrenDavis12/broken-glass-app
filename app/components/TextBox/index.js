/**
 *
 * TextBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TextBox(props) {
  let placeHolder = props.PlaceHolder.props;
  return (
    <label className='mr-2'>{props.Text} <input type='text' className="border border-info" onChange={props.handelInputChange} placeholder={placeHolder.defaultMessage} defaultValue={placeHolder.TextValue} /></label>
   
  );
}

TextBox.propTypes = {};

export default TextBox;
