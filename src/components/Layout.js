import React from 'react';
import Nav from '../components/Nav';
import mdxComponents from './mdxComponents';
import { MDXProvider } from '@mdx-js/tag';


function Layout({ location, title, children }) {
  return (
    <MDXProvider components={mdxComponents}>
      <div>
        <Nav />
        {children}
      </div>
    </MDXProvider>
  );
}

export default Layout;
