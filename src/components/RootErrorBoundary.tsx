'use client';
import { Component, type ReactNode } from 'react';

const RELOAD_KEY = 'wesbos:root-error-reload';
const RELOAD_WINDOW_MS = 10_000;

/**
 * Reload at most once per URL within RELOAD_WINDOW_MS, so a page that fails on the server
 * too shows the fallback instead of reloading forever.
 */
function shouldReload(href: string) {
  try {
    const last = JSON.parse(sessionStorage.getItem(RELOAD_KEY) ?? 'null') as { href: string; at: number } | null;
    if (last && last.href === href && Date.now() - last.at < RELOAD_WINDOW_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, JSON.stringify({ href, at: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Wraps the whole document. When a client-side navigation (including back/forward) can't load
 * the next page's RSC payload, Waku throws above the layout, so only this boundary catches it.
 * Waku's own boundary swaps the document for a bare "Caught an unexpected error" page that stays
 * up on every later back/forward until a manual refresh (#451). Instead, load the URL as a normal
 * document request, which is what a site without client routing would have done.
 */
export class RootErrorBoundary extends Component<{ children: ReactNode }, { error: unknown }> {
  state: { error: unknown } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error ?? new Error('Unknown error') };
  }

  componentDidCatch() {
    if (shouldReload(window.location.href)) {
      window.location.reload();
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    const message = error instanceof Error ? error.message : String(error);
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Wes Bos</title>
        </head>
        <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', lineHeight: 1.5 }}>
          <h1>Shoot, eh! Error</h1>
          <p>
            Something went wrong loading this page. {/* biome-ignore lint/a11y/useValidAnchor: reloads the page */}
            <a href="">Refresh the page</a> or go back to the <a href="/">home page</a>.
          </p>
          <p style={{ borderLeft: '4px solid red', padding: '1rem', background: 'rgba(255, 0, 0, 0.1)' }}>{message}</p>
        </body>
      </html>
    );
  }
}
