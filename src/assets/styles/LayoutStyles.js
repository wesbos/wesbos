import styled from 'styled-components';
import handsome from '../images/handsome.jpg';

const LayoutStyles = styled.div`
  min-height: calc(100vh - 40px);
  &.welcome {
    background: url(${handsome}) no-repeat top center;
    @media (max-width: 650px) {
      background-position: top left -400px;
      h2 {
        font-size: 3rem;
      }
    }
    a {
      text-decoration-color: var(--yellow);
    }
  }
  p {
    word-wrap: anywhere;
  }
`;

export default LayoutStyles;
