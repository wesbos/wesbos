import { useEffect, useState, useRef } from 'react';

export default function useRowFinder() {
  const ref = useRef<HTMLUListElement>(null);
  const previous = useRef<{
    width: number | undefined;
    renders: number;
  }>({
    width: undefined,
    renders: 0,
  });
  const [rows, setRows] = useState<Record<number, number>>({});

  // when the nav changes size, run this callback
  function callback([entry]: ResizeObserverEntry[]) {
    // if there is nothing, skip it
    if (!entry.target?.children) return;
    // if the width has not changed, skip it
    const { width } = entry.contentRect;
    if (width === previous.current.width && previous.current.renders >= 2) {
      // console.log('Same width, skipping');
      previous.current.renders = 0;
      return;
    }
    const items = Array.from(entry.target.children);
    let row = 0;
    const rowData: Record<number, number> = {};
    items.forEach((_item, i) => {
      const item = _item as HTMLElement;
      if (!item.previousElementSibling || item.offsetLeft < (item.previousElementSibling as HTMLElement).offsetLeft) {
        row += 1;
      }
      rowData[i] = row;
    });
    setRows(rowData);

    // update the prev width
    if (previous.current.width === width) {
      previous.current.renders = previous.current.renders + 1 || 1;
    }
    previous.current.width = width;
  }

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(callback);
    observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  function getRow(index: number): number {
    return rows[index] || 0;
  }

  return {
    ref,
    getRow,
  };
}
