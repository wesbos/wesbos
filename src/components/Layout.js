import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Nav from './Nav';
import mdxComponents from './mdxComponents';
import 'normalize.css';
import LayoutStyles from '../assets/styles/LayoutStyles';
import Fonts from './Fonts';
import Footer from './Footer';
import GlobalStyles from './styles/GlobalStyles';

const ContentStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  &.wiiiiiiiiiide {
    max-width: 1000px;
  }
  &.ultra-wide {
    max-width: 1800px;
  }
`;

function Layout({ location, title, children, className, pageContext, path, ...rest }) {
  if (pageContext.layout === 'thumbnail') return children;
  return (
    <>
      <GlobalStyles />
      <Fonts />
      <Helmet>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <meta name="theme-color" content="#ffc600" />
      </Helmet>
      <LayoutStyles
        className={`
          ${location.pathname === '/' ? 'welcome' : null}
          ${pageContext.layoutClasses}`}
      >
        <Nav pageContext={pageContext} />
        <MDXProvider components={mdxComponents}>
          <ContentStyles className={pageContext.layoutClasses}>{children}</ContentStyles>
        </MDXProvider>
        <Footer />
      </LayoutStyles>
    </>
  );
}

export default Layout;
