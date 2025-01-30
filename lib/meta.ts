import { Post } from '@/db/schema';
import { Metadata } from 'next';
import { relative } from 'path';
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

export function generateMdxMetadata(importMetaUrl: string) {
  return async function generateMetadata(
    params: unknown,
    parentMetaPromise: Promise<Metadata>
  ): Promise<Metadata> {
    const parentMeta = await parentMetaPromise;
    // Dynamically import the file based on the import.meta.url
    // We gotta explicitly limit the path to the app dir, otherwise it will try to import the entire repo
    // Find the relative path to the app dir
    const relativePath = relative(import.meta.url, importMetaUrl);
    // remove the file extension and everything after it
    const relativePathWithoutExtension = relativePath.replace(/\.(mdx|tsx)$/, '');
    console.log('relativePathWithoutExtension::', relativePathWithoutExtension);
    // Remove app/ and everything before it
    const relativePathWithoutApp = relativePathWithoutExtension.split('app/')[1];
    // Get the file extension from the original path
    const fileExtension = importMetaUrl.endsWith('.mdx') ? '.mdx' : '.tsx';
    // we add back the folder and the file extension
    const myself = await import(`../app/${relativePathWithoutApp}${fileExtension}`);
    // We have the option to override the title and description by exporting meta_title and meta_description from files
    const title = myself.meta_title || myself.title;
    const description = myself.meta_description || myself.excerpt;

    const foldedMeta = {
      title,
      description,
      twitter: {
        ...parentMeta.twitter,
        title,
        description,
      },
      openGraph: {
        ...parentMeta.openGraph,
        title,
        description,
      },
    };
    console.log('foldedMeta::', foldedMeta);
    return foldedMeta;
  };
}

