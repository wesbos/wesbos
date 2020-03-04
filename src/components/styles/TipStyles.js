import styled from 'styled-components';
import blackgrit from '../mdxComponents/blackgrit.png';
import whitegrit from '../mdxComponents/whitegrit.png';

const TipStyles = styled.div`
  border-bottom: 2px solid ${props => props.theme.yellow};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 400px 1fr;
  align-items: center;
  border: 5px solid black;
  margin-bottom: 5rem;
  position: relative;
  padding: 2rem;
  grid-gap: 2rem;
  background: url(${blackgrit});
  background-size: 550px;
  .tipContent {
    align-self: stretch;
    display: grid;
    align-content: start;
    & > * {
      order: 2;
    }
  }
  p {
    font-size: 2rem;
    line-height: 1.7;
  }
  .tipMeta {
    font-size: 1.5rem;
    font-style: italic;
    display: flex;
    order: 1;
    align-self: start;
    margin-top: -45px;
    /* border: 5px solid white; */
    border-top: 0;
    border-bottom: 0;
    right: 2rem;
    background: var(--yellow) url(${blackgrit});
    background-size: 550px;
    /* width: 100%; */
    /* width: calc(100% + 2rem); */
    /* margin-left: -1rem; */
    transform: rotate(-1deg);
    /* position: relative; */

    &:after {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: url(${whitegrit}) top left, url(${whitegrit}) bottom right;
      background-size: 550px;
      pointer-events: none;
    }
    & > * {
      padding: 1rem;
      flex: auto;
      line-height: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 2;
      &:before {
        content: '';
      }
    }
    a {
      text-decoration: none;
      /* border-bottom: 1px solid var(--yellow); */
    }
    svg {
      margin-right: 2px;
    }
    .twitter {
      fill: #1da1f2;
    }
  }
`;

export default TipStyles;
