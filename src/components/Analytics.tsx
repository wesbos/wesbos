import * as Counterscale from '@counterscale/tracker';

let isInitialized = false;
const isClient = typeof window !== 'undefined';

export function analytics() {
  console.log(`Setting up analytics`);
  if (isClient && !isInitialized) {
    Counterscale.init({
      siteId: `wesbos${import.meta.env.DEV ? '-dev' : ''}`,
      reporterUrl: 'https://nunyabiznass.wesbos.com/collect',
    });
    isInitialized = true;
  }
}

analytics();
