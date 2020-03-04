import { css } from 'styled-components';
import blackgrit from '../mdxComponents/blackgrit.png';
import whitegrit from '../mdxComponents/whitegrit.png';

const dirty = css`
  --rotate: -1deg;
  --scale: 1;
  background: var(--yellow) url(${blackgrit});
  background-size: 550px;
  transform: rotate(var(--rotate)) scale(var(--scale));
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
`;

export default dirty;
