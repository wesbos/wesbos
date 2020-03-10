import React from 'react';
import styled, { keyframes } from 'styled-components';
import blackGrit from './blackgrit.png';
import whiteGrit from './whitegrit.png';

const gritty = keyframes`
  from {
    background-position: 0;
  }

  to {
    background-position: -600px;
  }
`;

const headingSizes = {
  h1: 5,
  h2: 4,
  h3: 3,
  h4: 2.5,
  h5: 2,
  h6: 1.8,
  span: 3.2,
};

const HStyles = styled.h1`
  font-size: ${headingSizes.h1}rem;
  font-size: ${({ as }) => as && `${headingSizes[as]}rem`};
  position: relative;
  &:after {
    position: absolute;
    z-index: 2;
    content: '';
    background: url(${whiteGrit});
    background-size: 700px;
    background-repeat: repeat;
    background-position: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
  span.grit {
    background: url(${blackGrit});
    background-size: 600px;
    padding: 2rem 2rem 2rem 0;
    position: relative;
    ${({ as }) => as === 'span' && `margin-right: -2rem;`};
    &:hover {
      /* background-position: -600px; */
      animation: ${gritty} 2s steps(10) infinite;
    }
  }

  &:before {
    /* Yellow square is using ems so it scales up/down with the font size */
    width: 0.75em;
    height: 0.75em;
    content: '';
    pointer-events: none;
    background: var(--yellow);
    position: absolute;
    z-index: -1;
    --translate: -0.5rem;
    --rotate: 0deg;
    transform: translateX(var(--translate)) translateY(var(--translate))
      rotate(var(--rotate));
    ${({ as }) => as === 'span' && `visibility: hidden;`};
  }
  &:hover:before {
    visibility: visible;
  }
  a {
    color: inherit;
    text-decoration-color: var(--yellow);
  }
  .anchor {
    position: absolute;
    transform: translateX(-120%);
    text-decoration: none;
    /* opacity:0; */
    transition: all 0.2s;
    &:after {
      content: '🔗';
      &:hover {
        background: red;
      }
    }
  }
`;

export default function H(props) {
  return (
    <HStyles {...props}>
      <span className="grit">{props.children}</span>
    </HStyles>
  );
}
