import { useEffect, useState, useRef } from 'react';

export default function useRowFinder() {
  const ref = useRef(null);
  const previous = useRef({
    width: undefined,
    renders: 0,
  });
  const [rows, setRows] = useState({});

  // when the nav changes size, run this callback
  function callback([entry]) {
    // if there is nothing, skip it
    if (!entry.target || !entry.target.children) return;
    // if the width has not changed, skip it
    const width = entry.borderBoxSize.inlineSize;
    if (width === previous.current.width && previous.current.renders >= 2) {
      // console.log('Same width, skipping');
      previous.current.renders = 0;
      return;
    }
    const items = Array.from(entry.target.children);
    let row = 0;
    const rowData = {};
    items.forEach((item, i) => {
      if (
        !item.previousElementSibling ||
        item.offsetLeft < item.previousElementSibling.offsetLeft
      ) {
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

  useEffect(
    function() {
      console.log('didMount or didUpdate');
      const observer = new ResizeObserver(callback);
      const el = ref.current;
      observer.observe(el);
      return function() {
        observer.unobserve(el);
      };
    },
    [ref]
  );

  function getRow(index) {
    return rows[index];
  }

  return {
    ref,
    getRow,
  };
}
