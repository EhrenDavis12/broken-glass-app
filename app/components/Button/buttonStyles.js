import { css } from 'styled-components';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid white;
  color: white;

  &:active {
    background: #616160;
    color: white;
  }

  &:.disabled {
    background:#c9c9c9;
    color:#41413e;
    cursor: not-allowed;
  }
  
`;

const buttonStylesDark = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid black;
  color: black;

  &:active {
    background: #616160;
    color: white;
  }

  &:.disabled {
    background:#c9c9c9;
    color:#41413e;
    cursor: not-allowed;
  }
`;

export {buttonStylesDark, buttonStyles};
export default buttonStyles;
