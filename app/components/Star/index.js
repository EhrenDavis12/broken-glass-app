/**
 *
 * Star
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
function Star(props) {
  return (
      <img 
        height='20px' 
        width='20px' 
        className='border mx-1' style={{backgroundColor:props.Color}} 
        src={require(`../../images/${'BGIcon'}.png`)} 
        alt=""
      />
      
  );
}

Star.propTypes = {
  background: PropTypes.string,
};

export default Star;
