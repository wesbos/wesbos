import { getPosts } from '@/lib/getPosts';
import H from '@/components/mdxComponents/Headings';
import Pagination from '@/components/Pagination';
import { Tip } from '@/components/Tip';

export default async function HotTips({ params }: { params: { pageNumber: string } }) {
  const paramz = await params;
  const currentPage = parseInt(paramz.pageNumber, 10) || 1;
  const { posts, total, pages } = await getPosts({
    page: currentPage,
    type: 'tip',
    limit: 10
  });
  return (
    <>
      <H>🔥 There are {total} Hot Tips!!</H>
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

// This forces next to skip SSG, because we dont have access to the DB in build??
export const dynamic = 'force-dynamic';
