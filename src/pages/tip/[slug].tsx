import ContentNav from '../../components/ContentNav';
import { Tip } from '../../components/Tip';
import { getPostBySlug, getSiblingPostsBySlug } from '../../lib/getPosts';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from 'waku/router';

interface TipPageProps extends PageProps<'/tip/[slug]'> {
  slug: string;
}

export default async function TipPage(props: TipPageProps) {
  const { slug } = props;
  const post = await getPostBySlug(slug);
  const { prev, next } = await getSiblingPostsBySlug(slug, 'tip');
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <MetaTags {...props} />
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
