import { getPosts } from '@/lib/getPosts';
import H from '@/components/mdxComponents/Headings';
import Pagination from '@/components/Pagination';
import { Tip } from '@/components/Tip';
import { Metadata } from 'next';

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
    </>
  );
}

// Page Meta
export async function generateMetadata({ params }: { params: { pageNumber: string } }): Promise<Metadata> {
  const pageNumber = parseInt(params.pageNumber, 10) || 1;

  const { posts, total, pages } = await getPosts({
    page: pageNumber,
    type: 'tip',
    limit: 10
  });
  return {
    title: {
      absolute: `🔥 Hot Tips - Page ${pageNumber} of ${pages} - Wes Bos`,
    },
    description: `Hot tips are spicy lil' nuggets related to web development and tooling that I share on my twitter account.`,
  };
}

export const dynamic = 'force-dynamic';
