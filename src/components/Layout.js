import React from 'react';
import Nav from '../components/Nav';
import mdxComponents from './mdxComponents';
import { MDXProvider } from '@mdx-js/tag';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'normalize.css';
import font from '../assets/fonts/RadnikaNext/RadnikaNext-Black.woff2';
import LayoutStyles from '../assets/styles/LayoutStyles';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: radnika;
    src: url(${font});
  }
  html {
    border: 20px solid ${props => props.theme.yellow};
    border-color: black;
    background: white;
    font-size: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    min-height: calc(100vh - 40px);
    font-size: 2rem;
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: 'radnika', sans-serif;
    font-weight: normal;
    font-style: italic;
  }
  ::selection {
    background: ${props => props.theme.yellow};
  }
  a {
    /* text-decoration-color: blue; */
    color: #110059;
    text-decoration-color: antiquewhite;
  }
`

const ContentStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

function Layout({ location, title, children, className }) {
  console.log(location);
  return (
    <ThemeProvider theme={{ yellow: '#ffc600', grey: '#dadada' }}>
      <MDXProvider components={mdxComponents}>
        <>
          <GlobalStyle />
          <LayoutStyles className={className}>
            <Nav />
            <ContentStyles>
              {children}
            </ContentStyles>
          </LayoutStyles>
        </>
      </MDXProvider>
    </ThemeProvider>
  );
}

export default Layout;
