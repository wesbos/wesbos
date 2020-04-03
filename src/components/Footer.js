import React from 'react';
import styled from 'styled-components';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Podcast from './Podcast';
import LatestCourse from './LatestCourse';
import blackGrit from './mdxComponents/blackgrit.png';
import whiteGrit from './mdxComponents/whitegrit.png';
import dirty from './styles/Dirty';

const FooterStyles = styled.footer`
  background: black url(${whiteGrit});
  background-size: 500px;
  padding-top: 180px;
  padding-bottom: 80px;
  clip-path: polygon(0 100px, 100% 0, 100% 100%, 0% 100%);
  & > div {
    color: black;
    display: grid;
    max-width: var(--maxWidth);
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 3rem;
    & > * {
      /* ${dirty} */
      padding: 2rem;
      background: white url(${blackGrit});
      background-size: 500px;
      h3 {
        margin: 0;
        padding: 2px;
        margin-bottom: 2rem;
        text-align: center;
        margin-top: -30px;
        ${dirty}
        background: none;
        svg {
          position: relative;
          top: 3.5px;
          margin-right: 3px;
        }
        .highlight {
          background: var(--yellow) url(${blackGrit});
          background-size: 500px;
          padding: 5px;
        }
      }
      p {
        font-size: 1.6rem;
      }
    }
  }
`;
export default function Footer() {
  return (
    <FooterStyles>
      <div>
        <Podcast />
        <Twitter />
        <Instagram />
        <LatestCourse />
        <div>Youtube, Github, Facebook,</div>
      </div>
    </FooterStyles>
  );
}
