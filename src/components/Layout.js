import React from 'react';
import { Link } from 'gatsby';
import Nav from '../components/Nav';
import { rhythm, scale } from '../utils/typography';
import mdxComponents from './mdxComponents';
import { MDXProvider } from '@mdx-js/tag';


function Layout({ location, title, children }) {
  return (
    <MDXProvider components={mdxComponents}>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >

        <Nav />
        {children}
      </div>
    </MDXProvider>
  );
}

export default Layout;
