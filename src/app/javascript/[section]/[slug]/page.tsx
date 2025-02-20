import { IoLogoGithub } from 'react-icons/io';
import { getPostBySlug, getPosts, getSiblingPostsBySlug, makePathDynamicallyImportable } from '@/lib/getPosts';
import H from '@/components/mdxComponents/Headings';
import { postMeta } from '@/styles/PostMeta.module.css';
import { BeginnerJavaScript } from '@/components/beginnerJavaScript';
import clsx from 'clsx';
import { JavaScriptNotesStyles } from '@/styles/JavaScriptNotesStyles.module.css';
import { EditDialogStyles } from '@/styles/EditDialogStyles.module.css';
import { TableOfContents } from '@/components/TableOfContentsNew';
import ContentNav from '@/components/ContentNav';
import createSectionedFrontMatter from '@/utils/createSectionedFrontmatter';

export default async function JavaScriptNotesPage({ params }: { params: { slug: string; section: string } }) {
  const { slug, section } = await params;
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
  const { default: MDXContent } = await import(/* webpackExclude: /\.mp4$/ */ `@/content/${importPath}.mdx`);
  const editURL = `https://github.com/wesbos/beginner-javascript/edit/main/content/TODOOOOOx`;
  if (!post) {
    return <p>Post not found</p>;
  }
  return (
    <div className={clsx('ultra-wide', JavaScriptNotesStyles)}>
      <div>
        <TableOfContents />
        {/* <TableOfContents activeId={activeId} currentPage={pageContext.slug} /> */}
      </div>
      <article>
        <div>
          <H>{post.frontmatter.title}</H>
          <BeginnerJavaScript />
          <div className={postMeta}>
            <span>{post.frontmatter.category.join(', ')}</span>
            <a target="_blank" href={editURL} rel="noreferrer">
              Edit Post <IoLogoGithub className="inline" />
            </a>
          </div>
        </div>

        <MDXContent />

        <div className={EditDialogStyles}>
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

// export async function generateStaticParams() {
//   // Pre-generate every Notes page
//     const { posts } = await getPosts({ type: 'javascript', limit: 1000 });
//     const toc = createSectionedFrontMatter(posts);
//     const modules = toc
//       .map(([title, items]) => items)
//       .flat()
//       .map((item) => {
//         const [section, slug] = item?.frontmatter.slug.split('/') || [];
//         return { section, slug };
//       });
//     return modules;
// }

