'use client';
import type { ReactNode } from 'react';
import { useRouter } from 'waku';
import { ErrorBoundary } from './ErrorBoundary';

/** Resets the error boundary on every client-side navigation by keying it on the current path. */
export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  const { path } = useRouter();
  return <ErrorBoundary key={path}>{children}</ErrorBoundary>;
}
