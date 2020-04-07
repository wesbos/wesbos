import styled from 'styled-components';
import handsome from '../images/handsome.jpg';

const LayoutStyles = styled.div`
  min-height: calc(100vh - 40px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  &.welcome {
    background: url(${handsome}) no-repeat top center;
    /* font-family: 'Radnika'; */
    a {
      text-decoration-color: var(--yellow);
    }
    p,
    li {
      /* font-weight: 300; */
      /* font-size: 2.8rem; */
    }
  }
`;

export default LayoutStyles;
