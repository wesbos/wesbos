'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'waku';
import {
  LoadingIndicatorProgress,
  LoadingIndicatorProgressFinish,
  LoadingIndicatorProgressStart,
  LoadingIndicatorStyles,
} from '@/styles/LoadingIndicator.module.css';

/** Does this click send us to a different page in the same tab of this site? */
function isInternalNavigation(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  const link = (event.target as Element).closest?.('a');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return false;
  const url = new URL(link.href, window.location.href);
  return (
    url.origin === window.location.origin &&
    (url.pathname !== window.location.pathname || url.search !== window.location.search)
  );
}

export default function LoadingIndicator() {
  const { path, query } = useRouter();
  const [navigationState, setNavigationState] = useState<'start' | 'finish' | 'idle'>('idle');
  const route = `${path}?${query}`;
  const previousRoute = useRef(route);

  // Waku no longer has global router events, so a navigation starts when a link is clicked or the
  // user goes back or forward. Capture runs before the router handles the click and moves the URL.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isInternalNavigation(event)) setNavigationState('start');
    };
    const handlePopState = () => setNavigationState('start');
    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // ...and finishes when the router lands on the new route
  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    setNavigationState('finish');
    const timeout = setTimeout(() => setNavigationState('idle'), 1000);
    return () => clearTimeout(timeout);
  }, [route]);

  return (
    <div className={LoadingIndicatorStyles}>
      <div
        className={clsx(
          LoadingIndicatorProgress,
          navigationState === 'start' && LoadingIndicatorProgressStart,
          navigationState === 'finish' && LoadingIndicatorProgressFinish,
        )}
      >
        {/* {navigationState} */}
      </div>
    </div>
  );
}
