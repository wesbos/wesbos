import ContentNav from '../../components/ContentNav';
import { Tip } from '../../components/Tip';
import { getPostBySlug, getSiblingPostsBySlug } from '../../lib/getPosts';

interface TipPageProps {
  slug: string;
}

export default async function TipPage({ slug }: TipPageProps) {
  const post = await getPostBySlug(slug);
  const { prev, next } = await getSiblingPostsBySlug(slug, 'tip');
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <Tip tip={post} />
      <ContentNav prev={prev} next={next} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
