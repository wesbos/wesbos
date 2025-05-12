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
export default function LoadingIndicator() {
  const router = useRouter();
  const [navigationState, setNavigationState] = useState<'start' | 'finish' | 'idle'>('idle');

  // listen for navigation-pending events
  useEffect(() => {
    function handleNavigationStart(event: CustomEvent) {
      setNavigationState('start');
    }

    function handleNavigationComplete(event: CustomEvent) {
      setNavigationState('finish');
      setTimeout(() => {
        setNavigationState('idle');
      }, 1000);
    }

    router.unstable_events.on('start', handleNavigationStart);
    router.unstable_events.on('complete', handleNavigationComplete);

    return () => {
      router.unstable_events.off('start', handleNavigationStart);
      router.unstable_events.off('complete', handleNavigationComplete);
    };
  }, []);

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
