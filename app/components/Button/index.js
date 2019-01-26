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
import { A, ADark } from './A';
import { StyledButton, StyledButtonDark } from './StyledButton';
import Wrapper from './Wrapper';

function Button(props) {
  let button = (
    <StyledButton
      href={props.href}
      onClick={props.onClick}
      style={{ display: props.ReadOnly ? 'none' : 'block' }}
      data-toggle={props.toggle}
    >
      {props.children}
    </StyledButton>
  );

  if (props.style === "dark") {
    button = (
      <StyledButtonDark
        href={props.href}
        onClick={props.onClick}
        style={{ display: props.ReadOnly ? 'none' : 'block' }}
        data-toggle={props.toggle}
      >
        {props.children}
      </StyledButtonDark>
    );
  }


  if (props.handleRoute) {

    if (props.style === "dark") {
      button = (
        <Link to={props.href}>
          <ADark
            href={props.href}
          >
            {props.children}
          </ADark>

        </Link>
      );
    } else {
      button = (
        <Link to={props.href}>
          <A
            href={props.href}
          >
            {props.children}
          </A>

        </Link>
      );
    }
  }

  return button;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  toggle: PropTypes.bool,
};

export default Button;
