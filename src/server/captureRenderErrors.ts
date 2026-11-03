import * as Sentry from '@sentry/cloudflare';

const WAKU_RENDER_ERROR = 'Error during rendering:';

/**
 * Waku has no error hook for renders. An error thrown while streaming, like one inside <Suspense>,
 * only reaches its console.error as a string, with newlines escaped. Rebuild the Error from that
 * text so Sentry can parse the stack and apply source maps.
 */
export function captureRenderErrors() {
  const consoleError = console.error;
  console.error = (...args: unknown[]) => {
    consoleError(...args);
    const [label, details] = args;
    if (label !== WAKU_RENDER_ERROR || typeof details !== 'string') return;
    const stack = details.replaceAll('\\n', '\n');
    const error = new Error(stack.split('\n')[0]?.replace(/^\w*Error: /, ''));
    error.stack = stack;
    Sentry.captureException(error, { tags: { source: 'waku-render' } });
  };
}
