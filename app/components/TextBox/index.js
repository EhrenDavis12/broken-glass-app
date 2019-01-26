/**
 *
 * TextBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.input`
color:white;
border: 2px solid white;
margin-Right: 15px;
width: 350px;
padding-left:3;
`;

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TextBox(props) {
  let placeHolder = props.PlaceHolder.props;
  return (

    <Text type='text'
      onChange={props.handelInputChange}
      onKeyPress={props.onKeyPress}
      placeholder={placeHolder.defaultMessage}
      defaultValue={placeHolder.TextValue} />

  );
}

TextBox.propTypes = {};

export default TextBox;
