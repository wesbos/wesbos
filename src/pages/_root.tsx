import type { ReactNode } from 'react';
import { RootErrorBoundary } from '@/components/RootErrorBoundary';

export default async function RootElement({ children }: { children: ReactNode }) {
  return (
    <RootErrorBoundary>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body data-version="1.0">{children}</body>
      </html>
    </RootErrorBoundary>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
