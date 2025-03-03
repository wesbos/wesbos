'use client';
import { useEffect, useRef, useState } from 'react';
import { useActiveId } from './useActiveId';

function findFirstElementInViewport(elements: Element[]) {
  return elements.find((element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  });
}

export function useCurrentHeading() {
  const currentHeading = useRef<Element | null>(null);

  function handleSCrollEvent(e: Event) {
    // Find the last visible heading in the viewport
    const headingsWithIds = Array.from(document.querySelectorAll(`[id]:is(h1,h2,h3,h4,h5,h6)`)).reverse();
    // now filter them for visible ones
    const firstVisibleHeading = findFirstElementInViewport(headingsWithIds);
    if (firstVisibleHeading) {
      window.location.hash = `#${firstVisibleHeading.id}`;
      currentHeading.current = firstVisibleHeading;
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleSCrollEvent);
    return () => {
      console.log(`removing scroll event listener`);
      window.removeEventListener('scroll', handleSCrollEvent);
    };
  }, []);

  return currentHeading;
}

export function HashChange({ itemIds }: { itemIds: string[] }) {
  // const activeId = useActiveId(itemIds);
  // When this component loads, we want to scroll to the hash
  const currentHeading = useCurrentHeading();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      console.log('hash', hash);
      if (hash) {
        // We find the Heading that needs to be scrolled to
        const element = document.getElementById(hash.slice(1));
        // And we find the link with the current URL and hash
        const pathAndHash = `${window.location.pathname}${hash}`;
        const link = document.querySelector(`a[href="${pathAndHash}"]`);
        element?.scrollIntoView(true);
        link?.scrollIntoView(true);
      }
    }
  }, []);

  return null;
}
