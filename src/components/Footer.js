import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  background: black;
`;
export default function Footer() {
  return (
    <FooterStyles>
      <p>Hey im the footer</p>
      twitter insta youtube github syntax my courses my podcast my twitter insta
      * list of posts * list of courses
      <p>NETLIFY: {process.env.GATSBY_NETLIFY}</p>
      <p>BUILD_ID: {process.env.GATSBY_BUILD_ID}</p>
      <p>CONTEXT: {process.env.GATSBY_CONTEXT}</p>
      <p>REPOSITORY_URL: {process.env.GATSBY_REPOSITORY_URL}</p>
      <p>BRANCH: {process.env.GATSBY_BRANCH}</p>
      <p>HEAD: {process.env.GATSBY_HEAD}</p>
      <p>URL: {process.env.GATSBY_URL}</p>
      <p>DEPLOY_URL: {process.env.GATSBY_DEPLOY_URL}</p>
      <p>DEPLOY_PRIME_URL: {process.env.GATSBY_DEPLOY_PRIME_URL}</p>
      <p>DEPLOY_ID: {process.env.DEPLOY_ID}</p>
    </FooterStyles>
  );
}
