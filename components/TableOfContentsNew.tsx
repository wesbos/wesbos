import H from '@/components/mdxComponents/Headings';
import { getPosts } from '@/lib/getPosts';
import { TOCAsideStyles } from '@/styles/TOCAsideStyles.module.css';
import createSectionedFrontMatter from '@/utils/createSectionedFrontmatter';
import Link from 'next/link';
import { Fragment } from 'react';

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
                {/* Now recursively loop over the table of contents for this item */}
                {post.tableOfContents?.items && (
                  <ol>
                    {post.tableOfContents.items.map((item) => (
                      <li key={item.title}>{item.title}</li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </aside>
  );
}
