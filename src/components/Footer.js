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
    </FooterStyles>
  );
}
