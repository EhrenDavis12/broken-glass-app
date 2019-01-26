/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchBar from "containers/SearchBar/Loadable";
import { StyledHomePage } from "./StyledHomePage";
import styled from 'styled-components';
import LOGO from "../../images/BGLogo.png";
import messages from './messages';

const Wrapper = styled.div`
opacity: 0.7;
background-color:black;
padding: 8px;
height: 100vh;
`;
const SolidWrapper = styled.div`
opacity: 1;
`;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className='text-center'>
        <img src={LOGO} style={{ width: 600, marginBottom: 50, marginTop: 30 }} />
        <SearchBar />
      </div>
    );
  }
}
