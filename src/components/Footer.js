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
      <p>NETLIFY: ${process.env.NETLIFY}</p>
      <p>BUILD_ID: ${process.env.BUILD_ID}</p>
      <p>CONTEXT: ${process.env.CONTEXT}</p>
      <p>REPOSITORY_URL: ${process.env.REPOSITORY_URL}</p>
      <p>BRANCH: ${process.env.BRANCH}</p>
      <p>HEAD: ${process.env.HEAD}</p>
      <p>URL: ${process.env.URL}</p>
      <p>DEPLOY_URL: ${process.env.DEPLOY_URL}</p>
      <p>DEPLOY_PRIME_URL: ${process.env.DEPLOY_PRIME_URL}</p>
      <p>DEPLOY_ID: ${process.env.DEPLOY_ID}</p>
    </FooterStyles>
  );
}
