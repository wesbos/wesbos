import styled from 'styled-components';
import handsome from '../images/handsome.jpg';

const LayoutStyles = styled.div`
  min-height: 100vh;
  &.welcome {
    background: url(${handsome});
  }
`;

export default LayoutStyles;
