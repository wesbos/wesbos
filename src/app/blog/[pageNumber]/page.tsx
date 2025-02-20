import { getPosts } from '@/lib/getPosts';

export { default } from '../page';

// export async function generateStaticParams() {
//   // Pre-generate every page number
//   const { pages } = await getPosts({ type: 'blog' });
//   return Array.from({ length: pages }).map((_, i) => ({ pageNumber: (i + 1).toString() }));
// }
