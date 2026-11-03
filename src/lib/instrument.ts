import * as Sentry from '@sentry/react';
import { sentryOptions } from './sentry';

Sentry.init({
  ...sentryOptions,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Only same-origin requests, like Waku's RSC fetches, get trace headers
  tracePropagationTargets: [/^\//, /^https:\/\/wesbos\.com/],

  // There's no user data on this site, so record every session unmasked
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});
