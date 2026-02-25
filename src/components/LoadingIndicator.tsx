'use client';
import {
  LoadingIndicatorProgress,
  LoadingIndicatorProgressFinish,
  LoadingIndicatorProgressStart,
  LoadingIndicatorStyles,
} from '@/styles/LoadingIndicator.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'waku';
import type { Unstable_ChangeRouteCallback } from 'waku/router/client';

export default function LoadingIndicator() {
  const router = useRouter();
  const [navigationState, setNavigationState] = useState<'start' | 'finish' | 'idle'>('idle');

  useEffect(() => {
    const handleNavigationStart: Unstable_ChangeRouteCallback = () => {
      setNavigationState('start');
    };

    const handleNavigationComplete: Unstable_ChangeRouteCallback = () => {
      setNavigationState('finish');
      setTimeout(() => {
        setNavigationState('idle');
      }, 1000);
    };

    router.unstable_events.on('start', handleNavigationStart);
    router.unstable_events.on('complete', handleNavigationComplete);

    return () => {
      router.unstable_events.off('start', handleNavigationStart);
      router.unstable_events.off('complete', handleNavigationComplete);
    };
  }, [router]);

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
