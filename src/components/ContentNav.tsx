import { Link } from 'waku';
import type { MDXResult } from '@/lib/types';
import { ContentNavStyles } from '@/styles/ContentNavStyles.module.css';
import { slugToTitle } from '@/utils/slugToTitle';

function getSlugWithPrefix(result: MDXResult) {
  if (result.frontmatter.type === 'javascript') {
    return `/javascript/${result.frontmatter.slug}`;
  }
  return `${result.frontmatter.slug}`;
}

function getTitle(result: MDXResult) {
  return result.frontmatter?.title || slugToTitle(result.frontmatter.slug);
}

export default function ContentNav({ prev, next }: { prev?: MDXResult; next?: MDXResult }) {
  return (
    <nav className={ContentNavStyles} aria-label="Previous and next posts">
      {prev && (
        <Link to={getSlugWithPrefix(prev)} data-direction="prev" rel="prev">
          <strong>← Prev</strong>
          <p>{getTitle(prev)}</p>
        </Link>
      )}
      {next && (
        <Link to={getSlugWithPrefix(next)} data-direction="next" rel="next">
          <strong>Next →</strong>
          <p>{getTitle(next)}</p>
        </Link>
      )}
    </nav>
  );
}
