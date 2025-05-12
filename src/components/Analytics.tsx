'use client';
import * as Counterscale from '@counterscale/tracker';

let isInitialized = false;
const isClient = typeof window !== 'undefined';

export function Analytics() {
  if (isClient && !isInitialized) {
    console.log(`Setting up analytics`);
    Counterscale.init({
      siteId: `wesbos${import.meta.env.DEV ? '-dev' : ''}`,
      reporterUrl: 'https://nunyabiznass.wesbos.com/collect',
    });
    isInitialized = true;
  }
  return null;
}
