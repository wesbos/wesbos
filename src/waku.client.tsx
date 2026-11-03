// This file is the entry point for the client side of the application.
import './lib/instrument';
import * as Sentry from '@sentry/react';
import { createElement, StrictMode } from 'react';
import { createRoot, type HydrationOptions, hydrateRoot, type RootOptions } from 'react-dom/client';
import { Router } from 'waku/router/client';
import { isExpectedRouterError } from './lib/sentry';

const rootElement = createElement(StrictMode, null, createElement(Router));

const reportCaughtError = Sentry.reactErrorHandler();

const rootOptions = {
  // Error is thrown and not caught by ErrorBoundary
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Error caught in ErrorBoundary
  onCaughtError: (error: unknown, errorInfo: { componentStack?: string }) => {
    if (isExpectedRouterError(error)) return;
    reportCaughtError(error, errorInfo as Parameters<typeof reportCaughtError>[1]);
  },
  onRecoverableError: Sentry.reactErrorHandler(),
} as RootOptions & HydrationOptions;

if (globalThis.__WAKU_HYDRATE__) {
  hydrateRoot(document, rootElement, rootOptions);
} else {
  createRoot(document, rootOptions).render(rootElement);
}
