import ContentNav from "@/components/ContentNav";
import { Tip } from "@/components/Tip";
import { getPostBySlug, getSiblingPostsBySlug } from "@/lib/getPosts";

export default async function TipPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const { prev, next } = await getSiblingPostsBySlug(slug, 'tip');
  if (!post) {
    return <div>Post not found</div>;
  }
  return <div>
    <Tip tip={post} />
    <ContentNav prev={prev} next={next} />
  </div>;
}
