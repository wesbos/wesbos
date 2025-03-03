import H from '@/components/mdxComponents/Headings';
import { getPosts } from '@/lib/getPosts';
import { MDXResult, TableOfContentsHeading } from '@/lib/types';
import { TOCAsideStyles, VideoNumber } from '@/styles/TOCAsideStyles.module.css';
import createSectionedFrontMatter from '@/utils/createSectionedFrontmatter';
import { Link } from 'waku';
import { Fragment } from 'react';
import { TOC } from '@/styles/TOC.module.css';

function SamePageLink({
  children,
  to,
  scroll,
  ...props
}: { children: React.ReactNode; to: string; [key: string]: any }) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}

function ContentHeadings({
  headings,
  parent,
  currentSlug,
}: { headings?: TableOfContentsHeading[]; parent?: MDXResult; currentSlug: string }) {
  if (!headings) return null;
  const alreadyOnPage = currentSlug === parent?.frontmatter.slug;
  // If we are on the same page, we use a regular <a> tag, otherwise we use a <Link> tag
  const LinkComponent = alreadyOnPage ? SamePageLink : Link;
  return (
    <>
      {headings.map((heading) => (
        <Fragment key={heading.id}>
          <li key={heading.id}>
            <LinkComponent scroll={false} to={`/javascript/${parent?.frontmatter.slug}#${heading.id}`}>
              {heading.value}
            </LinkComponent>
            {heading.children && (
              <ul>
                <ContentHeadings currentSlug={currentSlug} headings={heading.children} parent={parent} />
              </ul>
            )}
          </li>
        </Fragment>
      ))}
    </>
  );
}

// TODO: Highlight the current page and restore the scroll
export async function TableOfContents({ currentSlug }: { currentSlug: string }) {
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
              <li key={post.frontmatter.slug} data-current={post.frontmatter.slug === currentSlug ? true : false}>
                <Link scroll={false} to={`/javascript/${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                  <span className={VideoNumber}>Part {post.frontmatter.postNumber}</span>
                </Link>
                <ol>
                  <ContentHeadings currentSlug={currentSlug} parent={post} headings={post.toc} />
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
