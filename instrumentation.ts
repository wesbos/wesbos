// import * as Sentry from '@sentry/nextjs';

import { createHighlighterSingleton } from './components/mdxComponents/HighlightedCode';

export async function register() {
  // if (process.env.NEXT_RUNTIME === 'nodejs') {
  //   await import('./sentry.server.config');
  // }

  // if (process.env.NEXT_RUNTIME === 'edge') {
  //   await import('./sentry.edge.config');
  // }
  createHighlighterSingleton();
}

// export const onRequestError = Sentry.captureRequestError;
