import H from '@/components/mdxComponents/Headings';
import { getPosts } from '@/lib/getPosts';
import { MDXResult, TableOfContentsHeading } from '@/lib/types';
import { TOCAsideStyles } from '@/styles/TOCAsideStyles.module.css';
import createSectionedFrontMatter from '@/utils/createSectionedFrontmatter';
import { Link } from 'waku';
import { Fragment } from 'react';
import { TOC } from '@/styles/TOC.module.css';

function ContentHeadings({ headings, parent }: { headings?: TableOfContentsHeading[]; parent?: MDXResult }) {
  if (!headings) return null;
  return (
    <>
      {headings.map((heading) => (
        <Fragment key={heading.id}>
          <li key={heading.id}>
            <Link to={`/javascript/${parent?.frontmatter.slug}#${heading.id}`}>{heading.value}</Link>
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
  const toc = createSectionedFrontMatter(posts);
  return (
    <aside className={TOCAsideStyles}>
      {toc.map(([section, posts]) => (
        <Fragment key={section}>
          <H as="h5">Module {section}</H>
          <ul>
            {(posts || []).map((post) => (
              <li key={post.frontmatter.slug}>
                <Link to={`/javascript/${post.frontmatter.slug}`}>
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

export async function TableOfContentsLanding() {
  const { posts } = await getPosts({ type: 'javascript', limit: 1000 });
  const toc = createSectionedFrontMatter(posts);
  return (
    <div className={TOC}>
      {toc.map(([title, items]) => (
        <div key={title}>
          <H as="h3">{title}</H>
          <ul>
            {(items || []).map((item) => (
              <li key={item.frontmatter.tocTitle}>
                <Link to={`/javascript/${item.frontmatter.slug}`}>{item.frontmatter.tocTitle}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
