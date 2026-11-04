import { type ReactNode, Suspense } from 'react';
import '@/components/styles/index.css';

import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';
import LoadingIndicator from '@/components/LoadingIndicator';
import Nav from '@/components/Nav';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { ContentStyles } from '@/styles/ContentStyles.module.css';
// import { operatorMono, radnika } from "@/lib/assets/fonts/Fonts";
import { LayoutStyles } from '@/styles/LayoutStyles.module.css';
import OperatorMonoBold from '../lib/assets/fonts/operator/OperatorMono-Bold_Web.woff2';
import OperatorMonoBook from '../lib/assets/fonts/operator/OperatorMono-Book_Web.woff2';
import RadnikaNextBlack from '../lib/assets/fonts/RadnikaNext/RadnikaNext-Black.woff2';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <link rel="preload" href={RadnikaNextBlack} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={OperatorMonoBook} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={OperatorMonoBold} as="font" type="font/woff2" crossOrigin="anonymous" />
      <LoadingIndicator />
      <div className={LayoutStyles}>
        <Analytics />
        <Nav />
        <div className={ContentStyles}>
          <RouteErrorBoundary>{children}</RouteErrorBoundary>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
