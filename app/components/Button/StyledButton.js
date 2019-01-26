import styled from 'styled-components';

import {buttonStyles, buttonStylesDark} from './buttonStyles';

const StyledButton = styled.button`
  ${buttonStyles};
`;

const StyledButtonDark = styled.button`
  ${buttonStylesDark};
`;


export {StyledButtonDark, StyledButton};
export default StyledButton;
