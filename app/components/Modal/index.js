/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import RatingBox from "components/RatingBox/index";
import Button from "components/Button/index"
import StyledModalBlock from './StyledModalBlock';
import StyledModalMain from './StyledModalMain';


function Modal(props) {


  const showHideClassName = props.ShowModal ? "modal display-block" : "modal display-none";

  let modal = (
    <div></div>
  );
  if (props.ShowModal) {
    modal = (
      <StyledModalBlock>
        <StyledModalMain>
          <div className="container mb-5">
            <Button toggle={true} onClick={props.onClick}>Close</Button>
            <h1>Your Rating</h1>
            {props.children}
          </div>
        </StyledModalMain>
      </StyledModalBlock>
    )
  }

  return modal;
}

Modal.propTypes = {
  ShowModal: PropTypes.bool,
  onClick: PropTypes.func,
  Children: PropTypes.object,
};

export default Modal;
