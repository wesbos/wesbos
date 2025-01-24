import { Post } from '@/db/schema';
import { Metadata } from 'next';

export const defaultMeta: Metadata = {
  title: 'Wes Bos',
  description: 'Full-stack JavaScript developer, teacher, course maker and all around tinkerer.',
};

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://wesbos.com'; // TODO: make this dynamic

export function getOgImage({ slug, title, image }: { slug: string; title: string; image?: string }) {
  const url = `${baseUrl}/${slug}`;
  const searchParams = new URLSearchParams();
  searchParams.set('title', title);
  searchParams.set('url', url);
  image ? searchParams.set('thumbnail', image) : null;
  const ogImage = `${baseUrl}/api/og-worker?${searchParams.toString()}`;
  return ogImage;
}
