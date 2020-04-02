import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import Helmet from 'react-helmet';
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
`;

function Layout({ location, title, children, className, pageContext }) {
  if (pageContext.layout === 'thumbnail') return children;
  return (
    <MDXProvider components={mdxComponents}>
      <>
        <GlobalStyles />
        <Fonts />
        <Helmet>
          <title>{title}</title>
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Helmet>
        <LayoutStyles className={className}>
          <Nav />
          <ContentStyles>{children}</ContentStyles>
          <Footer />
        </LayoutStyles>
      </>
    </MDXProvider>
  );
}

export default Layout;
