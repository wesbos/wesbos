'use client';
import { useEffect, useState } from 'react';

/**
 * The footer is prerendered at build time, so the year in the HTML is the build year.
 * Swap in the visitor's year after hydration so the footer doesn't go stale between deploys.
 */
export function CurrentYear() {
  // Read the date during render, not at module scope: Workers report 1970 outside a request.
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
