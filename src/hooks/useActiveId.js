import { useEffect, useState } from 'react';

// Based on https://nickymeuleman.netlify.app/blog/table-of-contents by Nicky Meulman. Thanks Nicky!
export function useActiveId(itemIds) {
  const [activeId, setActiveId] = useState('');
  const [isNewPage, setIsNewPage] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // set the active ID
            setActiveId(entry.target.id);
            // when we vist a new page, scroll the TOC current item into view
            if (isNewPage) {
              setIsNewPage(false);
              const tableOfContentsLink = document.querySelector(
                `a[href*="${entry.target.id}"]`
              );
              if (tableOfContentsLink) {
                tableOfContentsLink.scrollIntoView({
                  block: 'center',
                });
              }
            }
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      itemIds.forEach((id) => {
        const el = document.getElementById(id);
        if(el) observer.unobserve(el);
      });
    };
  }, [itemIds]);

  return activeId;
}
