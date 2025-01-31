import React from 'react';
import Link from 'next/link';
import { ContentNavStyles } from '@/styles/ContentNavStyles.module.css';
import { MDXResult } from '@/lib/types';
import { slugToTitle } from '@/utils/slugToTitle';

export default function ContentNav({ prev, next }: { prev?: MDXResult, next?: MDXResult}) {
  return (
    <div className={ContentNavStyles}>
      {prev && (
        <Link href={`${prev.frontmatter.slug}`}>
          <strong>← Prev</strong>
          {prev.frontmatter?.title ? <p>{prev.frontmatter.title}</p> : <p>{slugToTitle(prev.frontmatter.slug)}</p>}
        </Link>
      )}
      {next && (
        <Link href={`${next.frontmatter.slug}`}>
          <strong>Next →</strong>
          {next.frontmatter?.title ? <p>{next.frontmatter.title}</p> : <p>{slugToTitle(next.frontmatter.slug)}</p>}
        </Link>
      )}
    </div>
  );
}
