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
    function handleNavigationPending(event: CustomEvent) {
      if (event.detail.isPending) {
        console.log('navigation-pending', 'START');
        setNavigationState('start');
      }
    }

    window.addEventListener('navigation-pending', handleNavigationPending as EventListener);

    return () => {
      window.removeEventListener('navigation-pending', handleNavigationPending as EventListener);
    };
  }, []);

  useEffect(() => {
    if (navigationState === 'start') {
      setNavigationState('finish');
      setTimeout(() => {
        setNavigationState('idle');
      }, 1000);
    }
  }, [router.path]);

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
