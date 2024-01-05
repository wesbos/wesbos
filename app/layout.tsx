import 'normalize.css';
import React from 'react';
import { Metadata } from 'next';
import { MDXProvider } from '@mdx-js/react';
import GlobalStyles from '@/components/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import { ContentStyles } from '@/lib/assets/styles/ContentStyles';
import LayoutStyles from '@/lib/assets/styles/LayoutStyles';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { operatorMono, radnika } from '@/lib/assets/fonts/Fonts';
import mdxComponents from '@/components/mdxComponents';

export const metadata: Metadata = {
  title: 'Wes Bos - Full Stack Developer',
};
// import { MDXProvider } from '@mdx-js/react';
// import mdxComponents from '@/components/mdxComponents';
// import Nav from '@/src/components/Nav'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO if (pageContext.layout === 'thumbnail') return children;
  return (
    <html lang="en" className={`${radnika.variable} ${operatorMono.variable}`}>
      <link rel="shortcut icon" href="/@/public/favicon.svg" type="image/svg+xml" />
      <link rel="shortcut icon" href="/@/public/favicon.png" type="image/png" />
      <meta name="theme-color" content="#ffc600" />
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <LayoutStyles
          /* className={ TODO We need the current page `
          ${location.pathname === '/' ? 'welcome' : null}
          ${pageContext.layoutClasses}`  } */
          >
            <Nav />
            {/* <MDXProvider components={mdxComponents}> */}
            <ContentStyles /* className={ TODO: pageContext.layoutClasses } */>{children}</ContentStyles>
            {/* </MDXProvider> */}
            <Footer />
          </LayoutStyles>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
