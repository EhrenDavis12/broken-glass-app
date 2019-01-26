import { css } from 'styled-components';

const modalStyles = css`
position: fixed;
top: 0;
left: 0;
width:100%;
height: 100%;
background: rgba(0, 0, 0, 0.6);
display: block;
z-index:1;
`;

/* const displayBlock = css`
display: block;
`; */

/* const displayNone = css`
display: none;
`; */
const modalMain = css`
position:fixed;
  background: gray;
  color: black;
  width: 60%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index: 1;
  overflow-y:auto;
`;

//export default modalMain;
export default {modalStyles, modalMain};


