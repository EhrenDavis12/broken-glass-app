/**
 *
 * Button
 *
 */

import React, { Children } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import A from './A';
import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

function Button(props) {
  let button = (
    <StyledButton 
      href={props.href}
      onClick={props.onClick}
      style={{display: props.ReadOnly ? 'none' : 'block' }}
      data-toggle={props.toggle}
    >
      {props.children}
    </StyledButton>
  );


  if (props.handleRoute) {
    button = (
      <A 
        href={props.href}
        onClick={props.handleRoute}>
        <Link to={props.href}>  
        {props.children}
         </Link> 
      </A>
    );
  }

  return button;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  toggle:PropTypes.bool,
};

export default Button;
