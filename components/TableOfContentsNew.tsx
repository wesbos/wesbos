import H from '@/components/mdxComponents/Headings';
import { getPosts } from '@/lib/getPosts';
import { MDXResult } from '@/lib/types';
import { TOCAsideStyles } from '@/styles/TOCAsideStyles.module.css';
import createSectionedFrontMatter from '@/utils/createSectionedFrontmatter';
import Link from 'next/link';
import { Fragment } from 'react';

type TableOfContentsHeading = {
  depth: number;
  id: string;
  value: string;
  children?: TableOfContentsHeading[];
};

function ContentHeadings({ headings, parent }: { headings?: TableOfContentsHeading[]; parent?: MDXResult }) {
  if (!headings) return null;
  console.log(parent);
  return (
    <>
      {headings.map((heading) => (
        <Fragment key={heading.id}>
          <li key={heading.id}>
            <Link href={`/javascript/${parent?.frontmatter.slug}#${heading.id}`}>{heading.value}</Link>
          {heading.children && (
              <ul>
                <ContentHeadings headings={heading.children} parent={parent} />
              </ul>
          )}
          </li>
        </Fragment>
      ))}
    </>
  );
}

// TODO: Highlight the current page and restore the scroll
export async function TableOfContents() {
  const { posts } = await getPosts({
    type: 'javascript',
    limit: 1000,
  });
  // console.log(posts);
  const toc = createSectionedFrontMatter(posts);
  return (
    <aside className={TOCAsideStyles}>
      {toc.map(([section, posts]) => (
        <Fragment key={section}>
          <H as="h5">Module {section}</H>
          <ul>
            {posts.map((post) => (
              <li key={post.frontmatter.slug}>
                <Link href={`/javascript/${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                  <span className="videoNumber">Part {post.frontmatter.postNumber}</span>
                </Link>
                <ol>
                  <ContentHeadings parent={post} headings={post.toc} />
                </ol>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </aside>
  );
}
