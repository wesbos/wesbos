import React from 'react';
import { Link } from 'waku';
import { ContentNavStyles } from '@/styles/ContentNavStyles.module.css';
import { MDXResult } from '@/lib/types';
import { slugToTitle } from '@/utils/slugToTitle';

function getSlugWithPrefix(result: MDXResult) {
  if (result.frontmatter.type === 'javascript') {
    return `/javascript/${result.frontmatter.slug}`;
  }
  return `${result.frontmatter.slug}`;
}

export default function ContentNav({ prev, next }: { prev?: MDXResult, next?: MDXResult}) {
  return (
    <div className={ContentNavStyles}>
      {prev && (
        <Link to={getSlugWithPrefix(prev)}>
          <strong>← Prev</strong>
          {prev.frontmatter?.title ? <p>{prev.frontmatter.title}</p> : <p>{slugToTitle(prev.frontmatter.slug)}</p>}
        </Link>
      )}
      {next && (
        <Link to={getSlugWithPrefix(next)}>
          <strong>Next →</strong>
          {next.frontmatter?.title ? <p>{next.frontmatter.title}</p> : <p>{slugToTitle(next.frontmatter.slug)}</p>}
        </Link>
      )}
    </div>
  );
}
