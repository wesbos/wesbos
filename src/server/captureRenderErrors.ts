import * as Sentry from '@sentry/cloudflare';

const WAKU_RENDER_ERROR = 'Error during rendering:';
// React aborts a render when the visitor leaves mid-stream, which isn't a bug
const RENDER_ABORTED = 'The render was aborted by the server';
const CONNECTION_LOST = 'Network connection lost';

/**
 * A dropped client connection reports as "Network connection lost" too, from outside the request.
 * The same message from inside a request is a failed subrequest, like D1 or a fetch, so keep those.
 */
function isClientDisconnect(details: string) {
  if (details.includes(RENDER_ABORTED)) return true;
  const { normalizedRequest } = Sentry.getIsolationScope().getScopeData().sdkProcessingMetadata;
  return details.includes(CONNECTION_LOST) && !normalizedRequest;
}

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
    if (isClientDisconnect(details)) return;
    const stack = details.replaceAll('\\n', '\n');
    const error = new Error(stack.split('\n')[0]?.replace(/^\w*Error: /, ''));
    error.stack = stack;
    Sentry.captureException(error, { tags: { source: 'waku-render' } });
  };
}
