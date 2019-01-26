/**
 *
 * Star
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Glass = styled.img`
border-style:solid;
border-width:1px;
border-color:black;
margin-left:5px;
`;

function Star(props) {
  let color = "";
  let onClick = (id)=>{}
  if(props.Selected === true){
    color = '#ffff00';
  }
  if(!props.ReadOnly){
    onClick = props.onClick;
  }

  const Click = ()=> {
    if(!props.ReadOnly){
      onClick(props.Id);
    }
  }

  return (
      <Glass 
        height='20px' 
        width='20px' 
        onClick={Click}
        style={{backgroundColor:color}} 
        src={require(`../../images/${'BGIcon'}.png`)} 
        alt=""
      />
      
  );
}

Star.propTypes = {
  background: PropTypes.string,
};

export default Star;
