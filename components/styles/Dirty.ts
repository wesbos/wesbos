"use client";
import { css } from 'styled-components';
import blackgrit from '@/components/mdxComponents/blackgrit.png';
import whiteGrit from '@/components/mdxComponents/whitegrit.png';

const dirty = css`
  --rotate: -1deg;
  --scale: 1;
  background: var(--yellow) url(${blackgrit.src}) ;
  background-size: 550px;
  transform: rotate(var(--rotate)) scale(var(--scale));
  &:after {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(${whiteGrit.src}) top left, url(${whiteGrit.src}) bottom right;
    background-size: 550px;
    pointer-events: none;
  }
`;

export default dirty;
