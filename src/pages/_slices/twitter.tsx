import Twitter from '@/components/Twitter';

/**
 * Lazy slice for the footer tweets. The layout and most pages are static, so this is the only
 * part of the footer that runs per request. The client fetches it as a separate RSC request
 * (`/RSC/S/twitter.txt`) after the page loads. `Twitter` caches the X API response in KV.
 */
export default async function TwitterSlice() {
  return <Twitter />;
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
