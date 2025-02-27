// This file is the entry point for the client side of the application.
import { StrictMode, createElement } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "waku/router/client";
import * as Sentry from "@sentry/react";
const rootElement = createElement(StrictMode, null, createElement(Router));

if (globalThis.__WAKU_HYDRATE__) {
  hydrateRoot(document, rootElement);
} else {
  createRoot(document, {
    // Error is thrown and not caught by ErrorBoundary
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn("Uncaught error", error, errorInfo.componentStack);
    }),
    // Error caught in ErrorBoundary
    onCaughtError: Sentry.reactErrorHandler(),
    onRecoverableError: Sentry.reactErrorHandler(),
  }).render(rootElement);
}
