import { IoLogoGithub } from 'react-icons/io';
import { getPostBySlug, getSiblingPostsBySlug, makePathDynamicallyImportable } from '../../../lib/getPosts';
import H from '../../../components/mdxComponents/Headings';
import { BeginnerJavaScript } from '../../../components/beginnerJavaScript';
import clsx from 'clsx';
import { TableOfContents } from '../../../components/TableOfContentsNew';
import ContentNav from '../../../components/ContentNav';
import { JavaScriptNotesStyles } from "@/styles/JavaScriptNotesStyles.module.css";
import mdxComponents from '@/components/mdxComponents';
import { MetaTags } from '../../../components/MetaTags';
import type { PageProps } from "waku/router";


export default async function JavaScriptNotesPage(
  props: PageProps<"/javascript/[section]/[slug]">
) {
  const { section, slug } = props;
  const sluuuug = `${section}/${slug}`;
  const post = await getPostBySlug(sluuuug);
  const { prev, next } = await getSiblingPostsBySlug(sluuuug, "javascript");

  if (!post) {
    return (
      <p>
        Post not found for <code>{slug}</code>
      </p>
    );
  }

  const importPath = makePathDynamicallyImportable(post.frontmatter.filename);
  const { default: MDXContent } = post;
  const editURL = `https://github.com/wesbos/beginner-javascript/edit/main/content/${importPath}.mdx`;

  return (
    <div className={clsx("ultra-wide", JavaScriptNotesStyles)}>
      <MetaTags {...props} />
      <div>
        <TableOfContents />
      </div>
      <article>
        <div>
          <H>{post.frontmatter.title}</H>
          <BeginnerJavaScript />
          <div>
            <span>{post.frontmatter.category.join(", ")}</span>
            <a target="_blank" href={editURL} rel="noreferrer">
              Edit Post <IoLogoGithub className="inline" />
            </a>
          </div>
        </div>

        <MDXContent components={mdxComponents} />

        <div>
          <p>
            Find an issue with this post? Think you could clarify, update or add
            something?
          </p>
          <p>
            All my posts are available to edit on Github. Any fix, little or
            small, is appreciated!
          </p>
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
