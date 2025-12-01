import { Link } from 'waku';
import { PaginationStyles } from '@/styles/PaginationStyles.module.css';
import clsx from 'clsx';

export default function Pagination({
  totalCount,
  currentPage = 1,
  totalPages,
  pathPrefix,
  scroll = true,
}: {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pathPrefix: string;
  scroll?: boolean;
}) {
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  return (
    <div className={clsx(PaginationStyles, 'dirty')}>
      <Link
        className="dirty"
        aria-disabled={prevPage <= 0}
        to={prevPage <= 0 ? '#' : `${pathPrefix}${prevPage === 1 ? '' : prevPage}`}
        scroll={scroll}
      >
        ← Prev 10 please
      </Link>
      <p className="dirty">
        Page {currentPage} of {totalPages}
      </p>
      <Link
        className="dirty"
        aria-disabled={nextPage > totalPages}
        to={nextPage > totalPages ? '#' : `${pathPrefix}${nextPage}`}
        scroll={scroll}
      >
        {nextPage > totalPages ? `That's all Folks` : `10 More please →`}
      </Link>
    </div>
  );
}
