import Contact from './content.mdx';
import { Suspense } from 'react';
async function SlowBoy() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div>✅ Loaded at {new Date().toLocaleTimeString()}! </div>;
}

export default function ContactPage() {
  return (
    <div>
      <Suspense fallback={<div>⌛ Loading Slow component...</div>}>
        <SlowBoy />
      </Suspense>
      <Contact />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Contact - Wes Bos',
  } as const;
};
