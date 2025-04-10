import mdxComponents from '@/components/mdxComponents';
import { HashChange } from '@/lib/hooks/useHashChange';
import { JavaScriptNotesStyles } from '@/styles/JavaScriptNotesStyles.module.css';
import clsx from 'clsx';
import { IoLogoGithub } from 'react-icons/io';
import type { PageProps } from 'waku/router';
import ContentNav from '../../../components/ContentNav';
import { MetaTags } from '../../../components/MetaTags';
import { TableOfContents } from '../../../components/TableOfContentsNew';
import { BeginnerJavaScript } from '../../../components/beginnerJavaScript';
import H from '../../../components/mdxComponents/Headings';
import { getPostBySlug, getSiblingPostsBySlug, makePathDynamicallyImportable } from '../../../lib/getPosts';

type TOCItem = {
  id: string;
  children?: TOCItem[];
};

function getIds(toc: TOCItem[]): string[] {
  return toc.flatMap((item) => {
    return [item.id, ...getIds(item.children || [])];
  });
}

export default async function JavaScriptNotesPage(props: PageProps<'/javascript/[section]/[slug]'>) {
  const { section, slug } = props;
  const sluuuug = `${section}/${slug}`;
  const post = await getPostBySlug(sluuuug);
  const { prev, next } = await getSiblingPostsBySlug(sluuuug, 'javascript');

  if (!post) {
    return (
      <p>
        Post not found for <code>{slug}</code>
      </p>
    );
  }

  const importPath = makePathDynamicallyImportable(post.frontmatter.filename);
  const { default: MDXContent, toc } = post;
  const headingIds = getIds(toc);
  const editURL = `https://github.com/wesbos/wesbos/tree/master/${post.filePath}`;

  return (
    <div className={clsx('ultra-wide', JavaScriptNotesStyles)}>
      <MetaTags {...props} />
      <div>
        <HashChange itemIds={headingIds} />
        <TableOfContents currentSlug={sluuuug} />
      </div>
      <article>
        <div>
          <H>{post.frontmatter.title}</H>
          <BeginnerJavaScript />
          <div>
            <span>{post.frontmatter.category.join(', ')}</span>
            <a target="_blank" href={editURL} rel="noreferrer">
              Edit Post <IoLogoGithub className="inline" />
            </a>
          </div>
        </div>

        <MDXContent components={mdxComponents} />

        <div>
          <p>Find an issue with this post? Think you could clarify, update or add something?</p>
          <p>All my posts are available to edit on Github. Any fix, little or small, is appreciated!</p>
          <p>
            <a rel="noopener noreferrer" target="_blank" href={editURL}>
              <IoLogoGithub /> Edit on Github
            </a>
          </p>
        </div>
        <ContentNav prev={prev} next={next} />
      </article>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
