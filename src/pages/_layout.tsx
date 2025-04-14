import { type ReactNode, Suspense } from 'react';
import '@/components/styles/index.css';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { ContentStyles } from '@/styles/ContentStyles.module.css';
// import { operatorMono, radnika } from "@/lib/assets/fonts/Fonts";
import { LayoutStyles } from '@/styles/LayoutStyles.module.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingIndicator from '@/components/LoadingIndicator';
import Sentry from '@/components/Sentry';
import RadnikaNextBlack from '../lib/assets/fonts/RadnikaNext/RadnikaNext-Black.woff2';
import OperatorMonoBold from '../lib/assets/fonts/operator/OperatorMono-Bold_Web.woff2';
import OperatorMonoBook from '../lib/assets/fonts/operator/OperatorMono-Book_Web.woff2';
type RootLayoutProps = { children: ReactNode; path: string };

export default async function RootLayout({ children, path }: RootLayoutProps) {
  return (
    <>
      <link rel="preload" href={RadnikaNextBlack} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={OperatorMonoBook} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={OperatorMonoBold} as="font" type="font/woff2" crossOrigin="anonymous" />
      <Sentry />
      <LoadingIndicator />
      <div className={LayoutStyles}>
        <Nav path={path} />
        <div className={ContentStyles}>
          <ErrorBoundary key={path}>{children}</ErrorBoundary>
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
