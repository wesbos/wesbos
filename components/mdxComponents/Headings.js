import { styled } from '@/styled-system/jsx';
import React from 'react';
// import styled, { keyframes } from 'styled-components';

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
  @media (max-width: 450px) {
    font-size: 3rem;
  }
  position: relative;
  &:after {
    position: absolute;
    z-index: 2;
    content: '';
    background: var(--whiteGrit);
    background-size: 700px;
    background-repeat: repeat;
    background-position: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }


  &:before {
    /* Yellow square is using ems so it scales up/down with the font size */
    width: 0.75em;
    height: 0.75em;
    content: '';
    pointer-events: none;
    background: var(--yellow);
    position: absolute;
    z-index: 0;
    --translate: -0.5rem;
    --rotate: 0deg;
    transform: translateX(var(--translate)) translateY(var(--translate)) rotate(var(--rotate));
  }
  &:hover:before {
    visibility: visible;
  }
  a {
    color: inherit;
    text-decoration-color: var(--yellow);
  }
  .hash-anchor {
    position: absolute;
    transform: translateX(-120%);
    text-decoration: none;
    opacity: 0;
  }
  &:hover .hash-anchor {
    opacity: 1;
  }
`;
/* eslint-disable react/destructuring-assignment */
export default function H(props) {
  const { looksLike, className, as, ...forwardedProps } = props;
  return (
    <HStyles {...forwardedProps} className={`${className ?? ''} ${as}`} as={as}>
      <span className="grit">{props.children}</span>
    </HStyles>
  );
}
