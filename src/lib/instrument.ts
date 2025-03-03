'use client';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
// import {
//   createRoutesFromChildren,
//   matchRoutes,
//   useLocation,
//   useNavigationType,
// } from "react-router-dom";

Sentry.init({
  dsn: 'https://dd98dd6ca4df23ad958966a5384321e2@o28940.ingest.us.sentry.io/4508735015026688',
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    // Sentry.reactRouterV6BrowserTracingIntegration({
    //   useEffect,
    //   useLocation,
    //   useNavigationType,
    //   createRoutesFromChildren,
    //   matchRoutes,
    // }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/rsc\.wesbos\.com/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
});
