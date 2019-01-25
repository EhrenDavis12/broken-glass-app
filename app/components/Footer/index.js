/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import StyledFooter from './StyledFooter';


function Footer() {
  return (
    <StyledFooter>
      <div className="row">
        <div className="col-4">
          <h4>Contributors</h4>
          <p>Olga</p>
          <p>Will</p>
          <p>Ehren</p>
          <p>Roy</p>
        </div>
        <div className="col-1">
          <h4>Git</h4>
        </div>
        <div className="col-1">
          <h4>Git</h4>
        </div>
      </div>
    </StyledFooter>
  );
}

Footer.propTypes = {};

export default Footer;
