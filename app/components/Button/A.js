import styled from 'styled-components';

import { buttonStyles, buttonStylesDark } from './buttonStyles';

const A = styled.button`
  ${buttonStyles};
`;

const ADark = styled.button`
  ${buttonStylesDark};
`;

export { A, ADark };
export default A;
