import * as Sentry from '@sentry/cloudflare';
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { captureRenderErrors } from './captureRenderErrors';

vi.mock('@sentry/cloudflare', () => ({ captureException: vi.fn() }));

const originalConsoleError = console.error;

describe('captureRenderErrors', () => {
  beforeEach(() => {
    vi.mocked(Sentry.captureException).mockClear();
    console.error = vi.fn();
    captureRenderErrors();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  test('rebuilds and reports render errors from Waku logs', () => {
    console.error('Error during rendering:', 'Error: Boom\\n    at Page (page.js:1:1)');
    const [error] = vi.mocked(Sentry.captureException).mock.calls[0] as [Error];
    expect(error.message).toBe('Boom');
    expect(error.stack).toBe('Error: Boom\n    at Page (page.js:1:1)');
  });

  test('ignores renders aborted because the visitor left', () => {
    console.error(
      'Error during rendering:',
      'Error: The render was aborted by the server without a reason.\\n    at abort (ssr/index.js:1:1)',
    );
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  test('ignores other console errors', () => {
    console.error('Cache read error:', 'nope');
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });
});
