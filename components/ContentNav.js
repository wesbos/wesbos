import React from 'react';
import Link from 'next/link';
import { ContentNavStyles } from '@/styles/ContentNavStyles.module.css';

export default function ContentNav({ prev, next, pathPrefix }) {
  return (
    <div className={ContentNavStyles}>
      {prev && (
        <Link href={`${pathPrefix}${prev.node.fields.slug}`}>
          <strong>← Prev</strong>
          {prev.node.frontmatter ? <p>{prev.node.frontmatter.title}</p> : <p>{prev.node.body}</p>}
        </Link>
      )}
      {next && (
        <Link href={`${pathPrefix}${next.node.fields.slug}`}>
          <strong>Next →</strong>
          {next.node.frontmatter ? <p>{next.node.frontmatter.title}</p> : <p>{next.node.body}</p>}
        </Link>
      )}
    </div>
  );
}
