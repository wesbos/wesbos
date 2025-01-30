import { Tip } from "@/components/Tip";
import { getPostBySlug } from "@/lib/getPosts";

export default async function TipPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return <div>
    <Tip tip={post} />
  </div>;
}
