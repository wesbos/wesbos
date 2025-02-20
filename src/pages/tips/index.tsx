import { getPosts } from '../../lib/getPosts';
import H from '../../components/mdxComponents/Headings';
import Pagination from '../../components/Pagination';
import { Tip } from '../../components/Tip';

export default async function HotTips({ page }: { page: string }) {
  const currentPage = parseInt(page || '1');

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
        {posts.map((tip, i) => (
          <Tip key={`${tip.frontmatter.slug}-${i}`} tip={tip} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalCount={total} totalPages={pages} pathPrefix="/tips/" />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
    title: '🔥 Hot Tips - Wes Bos',
  } as const;
};
