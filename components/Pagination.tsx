import React from 'react';
import Link from 'next/link';
import { PaginationStyles } from '@/styles/PaginationStyles.module.css';
import clsx from 'clsx';

export default function Pagination({ totalCount, currentPage = 1, totalPages,  pathPrefix }: {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pathPrefix: string;
}) {

  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  return (
    <div className={clsx(PaginationStyles, 'dirty')}>
      <Link className="dirty" disabled={prevPage <= 0 ? true : null} href={prevPage <= 0 ? '' : `${pathPrefix}${prevPage === 1 ? '' : prevPage}`}>
        ← Prev 10 please
      </Link>
      <p className="dirty">
        Page {currentPage} of {totalPages}
      </p>
      <Link className="dirty" disabled={nextPage > totalPages ? true : null} href={nextPage > totalPages ? '' : `${pathPrefix}${nextPage}`}>
        {nextPage > totalPages ? `That's all Folks` : `10 More please →`}
      </Link>
    </div>
  );
}
