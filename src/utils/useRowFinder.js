import { useEffect, useState, useRef } from 'react';

export default function useRowFinder() {
  const ref = useRef(null);

  const [rows, setRows] = useState({});

  // when the nav changes size, run this callback
  function callback([entry]) {
    if (!entry.target || !entry.target.children) return;

    const items = Array.from(entry.target.children);
    console.log(items);

    let row = 0;
    const rowData = {};
    items.forEach((item, i) => {
      if (
        !item.previousElementSibling ||
        item.offsetLeft < item.previousElementSibling.offsetLeft
      ) {
        row += 1;
        console.log(`NEW ROW STARTED AT ${item.textContent}`);
      }
      rowData[i] = row;
    });
    setRows(rowData);
  }

  useEffect(
    function() {
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
