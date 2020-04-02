import { createGlobalStyle } from 'styled-components';
import whiteGrit from '../mdxComponents/whitegrit.png';
import blackGrit from '../mdxComponents/blackgrit.png';
import font from '../../assets/fonts/RadnikaNext/RadnikaNext-Black.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: radnika;
    src: url(${font});
  }
  :root {
    --yellow: #ffc600;
    --lightGrey: #d8d8d8;
    --lightGray: var(--lightGrey);
    --imGoingToFaint: #fbfbfb;
    --maxWidth: 1200px;
  }
  html {
    box-sizing: border-box;
    border: 20px solid black;
    border-color: black;
    border-image: url(${whiteGrit}) 200 round;
    background: white;
    font-size: 10px;
    font-family: 'HCo Operator Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
    &:after {
      box-sizing: content-box;
      display: block;
      content: '';
      height: 100%;
      width: 100%;
      position: absolute;
      top:-20px;
      left: -20px;
      z-index: -1;
      border: 20px solid black;
    }
    &:before {
      --size: 40px;
      box-sizing: content-box;
      display: block;
      content: '';
      height: calc(100% - var(--size));
      width: calc(100% - var(--size));
      position: absolute;
      top: calc(var(--size) * -0.5);
      left: calc(var(--size) * -0.5);
      z-index: -1;
      border: var(--size) solid transparent;
      border-image: url(${blackGrit}) 250 round;
    }
  }
  body {
    min-height: calc(100vh - 40px);
    font-size: 2rem;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'radnika', sans-serif;
    font-weight: normal;
    font-style: italic;
    line-height: 1.5;
  }

  ::selection {
    background: var(--yellow);
  }
  a {
    color: black;
    /* text-decoration-color: rgba(0,0,0,0.5)
    text-decoration-style: solid;
    text-decoration-thickness: 2px; */
  }
  p {
    line-height: 1.77777777777777776777777777;
    font-weight: 400;
  }

  p a, li a {
    --rotate: -2deg;
    --scaleX: 1;
    /* display: inline-flex; */
    position: relative;
    &:before {
      /* display: inline-block; */
      height: 5px;
      position: absolute;
      background: var(--yellow);
      content: '';
      width: 100%;
      bottom: -2px;
      z-index: -1;
      transition: transform 0.1s;
      transform: skew(-20deg) rotate(var(--rotate)) scaleX(var(--scaleX));
    }
    &:hover {
      --scaleX: 1.03;
    }
  }

  p a:nth-child(4n+1) { --rotate: -2deg; }
  p a:nth-child(4n+2) { --rotate: 1.64deg; }
  p a:nth-child(4n+3) { --rotate: 0.6deg; }
  p a:nth-child(4n+4) { --rotate: -0.75deg; }

  :not(pre) > code {
    background: #f6f6f6;
    border: 1px solid rgba(0,0,0,0.05);
    padding: 0 3.5px;
  }

  pre[data-language] {
    border-radius: 0;
    padding: 3rem;
    width: 110%;
    margin-left: -5%;
    line-height: 1.5;

  }
  code, kbd, samp {
    font-family: 'Operator mono';
    font-weight: 300;
  }

  video {
    max-width: 100%;
  }

  @media (min-width:2500px) {
    body:after {
      content: 'Wow you have a big monitor!';
      display: block;
      position: fixed;
      top: 0;
      bottom:0;
      right: 3rem;
      font-size: 6.5vh;
      pointer-events: none;
      transform: rotate(90deg);
    }
  }

  img {
    max-width: 100%;
  }
`;
export default GlobalStyles;
