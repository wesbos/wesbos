import { getPosts, parseContent } from '@/lib/getPosts';
import * as all from './test.mdx';
import H from '@/components/mdxComponents/Headings';
import Pagination from '@/components/Pagination';
import { TipStyles } from '@/styles/TipStyles.module.css';
import Link from 'next/link';
import TipMeta from '@/components/TipMeta';

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
  return (
    <>
      <H>🔥 There are {total} Hot Tips</H>
      <p>
        Hot tips are spicy lil' nuggets related to web development and tooling that I share on <a href="https://twitter.com/wesbos">my twitter account</a>. I've logged them here to make them easier to find.
      </p>
      {/* <Pagination currentPage={pageContext.currentPage} totalCount={tips.totalCount} pathPrefix="/tips/" /> */}
      <div>
        {posts.map((tip, i) => (
          <div className={TipStyles} key={`${tip.frontmatter.slug}-${i}`}>
            <Link href={`/tip/${tip.frontmatter.slug}`}>
              {/* {tip.frontmatter.videos && tip.frontmatter.videos.map((url) => <video src={url} key={url} autoPlay muted loop />)} */}
              {/* TODO IMAGES {tip.frontmatter.images && tip.frontmatter.images.map((image, idx) => <Img image={image} key={`image${idx}`} alt={tip.body} />)} */}
            </Link>
            <div className="tipContent">
              <TipMeta tip={tip} />
              <tip.default />
            </div>
          </div>
        ))}
      </div>
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
