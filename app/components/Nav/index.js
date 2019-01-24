/**
 *
 * Nav
 *
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Nav(props) {
  const {
    isAuthenticated,
    userHasScopes,
    userHasRole,
    login,
    logout
  } = props.auth;

  const nav = (
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/api/v1/public">Public</Link>
      </li>
      {isAuthenticated() && (
        <li>
          <Link to="/api/v1/private">Private</Link>
        </li>
      )}
      {isAuthenticated() && userHasScopes(["read:review"]) && (
        <li>
          <Link to="/api/v1/review">Review</Link>
        </li>
      )}
      {isAuthenticated() && userHasRole(["admin"]) && (
        <li>
          <Link to="/api/v1/admin">Admin</Link>
        </li>
      )}
      <li>
        <button onClick={isAuthenticated() ? logout : login}>
          {isAuthenticated() ? 'Logout' : 'Login'}
        </button>
      </li>
      
    </ul>
  </nav>
  );
  return nav;
}

Nav.propTypes = {
  auth: PropTypes.object,
};

export default Nav;
