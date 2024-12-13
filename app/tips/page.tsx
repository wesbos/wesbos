import { getPosts, parseContent } from '@/lib/getPosts';
import * as all from './test.mdx';
import H from '@/components/mdxComponents/Headings';
import Pagination from '@/components/Pagination';
import { TipStyles } from '@/styles/TipStyles.module.css';
import Link from 'next/link';
import TipMeta from '@/components/TipMeta';
import Image from 'next/image';
import mdxComponents from '@/components/mdxComponents';
import { Tip } from '@/components/Tip';

// export default async function HotTips() {
//   console.log(all);
//   const allParsed = await parseContent(all);
//   console.log(allParsed);
//   const Content = all.default;
//   return (
//     <div>
//       <p>TIPS GO HERE</p>
//     </div>
//   );
// }

export default async function HotTips({ params }: { params: { pageNumber: string } }) {
  const paramz = await params;
  const currentPage = parseInt(paramz.pageNumber, 10) || 1;
  const { posts, total, pages } = await getPosts({
    page: currentPage,
    type: 'tip'
  });
  console.log(posts);
  return (
    <>
      <H>🔥 There are {total} Hot Tips</H>
      <p>
        Hot tips are spicy lil' nuggets related to web development and tooling that I share on <a href="https://twitter.com/wesbos">my twitter account</a>. I've logged them here to make them easier to find.
      </p>
      <Pagination currentPage={currentPage} totalCount={total} totalPages={pages} pathPrefix="/tips/" />
      <div>
        {posts.map((tip, i) => {
          return <Tip key={`${tip.frontmatter.slug}-${i}`} tip={tip} />;
        })}
      </div>
      <Pagination currentPage={currentPage} totalCount={total} totalPages={pages} pathPrefix="/tips/" />
      {/* <PostMetaTags
        post={{
          frontmatter: {
            slug: location.pathname,
            title: `🔥 Hot Tips ${pageContext.currentPage ? `- Page ${pageContext.currentPage}` : ''}`,
          },
        }}
      /> */}
    </>
  );
}
