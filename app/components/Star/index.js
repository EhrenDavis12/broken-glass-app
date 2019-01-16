/**
 *
 * Star
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Star(props) {
  //background = props.Selected ? '#ffff00' : "transparent";
  return (
      <img height='20px' width='20px' className='border mx-1' style={{backgroundColor:props.Color}} src='https://www.bevspot.com/wp-content/themes/bevblog/images/cocktail-glassware/martini.png'/>
  );
}

Star.propTypes = {
  background: PropTypes.string,
};

export default Star;