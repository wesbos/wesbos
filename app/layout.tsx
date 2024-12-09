import '@/components/styles/index.css';
import React from 'react';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { operatorMono, radnika } from '@/lib/assets/fonts/Fonts';
import { LayoutStyles } from '@/styles/LayoutStyles.module.css';
import { ContentStyles } from '@/styles/ContentStyles.module.css';

// import mdxComponents from '@/components/mdxComponents';

export const metadata: Metadata = {
  title: 'Wes Bos - Full Stack Developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO if (pageContext.layout === 'thumbnail') return children;
  return (
    <html lang="en" className={`${radnika.variable} ${operatorMono.variable}`}>
      <meta name="theme-color" content="#ffc600" />
      <body>
        <div
          className={LayoutStyles}
          /* className={ TODO We need the current page `
          ${location.pathname === '/' ? 'welcome' : null}
          ${pageContext.layoutClasses}`  } */
        >
          <Nav />
          <div className={ContentStyles} /* className={ TODO: pageContext.layoutClasses } */>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
