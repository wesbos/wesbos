import React from 'react';
import Nav from '../components/Nav';
import mdxComponents from './mdxComponents';
import { MDXProvider } from '@mdx-js/tag';
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import font from '../assets/fonts/RadnikaNext/RadnikaNext-BlackItalic.woff2';
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: radnika;
    src: url(${font});
  }
  html {
    background: white;
    font-size: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    font-size: 2rem;
  }
  h1,h2,h3,h4,h5,h6 {
    font-family: 'radnika', sans-serif;
    font-weight: normal;
  }
  ::selection {
      background: ${props => props.theme.yellow};
    }
`

function Layout({ location, title, children }) {
  return (
    <ThemeProvider theme={{ yellow: '#ffc600' }}>
      <MDXProvider components={mdxComponents}>
        <>
          <GlobalStyle />
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Nav />
            {children}
          </div>
        </>
      </MDXProvider>
    </ThemeProvider>
  );
}

export default Layout;
