import { Image } from '@/components/Image';
const url = `https://syntax.fm/api/shows/latest`;
import synaxLogo from '@/assets/syntax-artwork.jpeg?meta';
import { withCache } from '@/lib/cache';
import { FooterBlock, FooterHeading } from '@/styles/FooterStyles.module.css';

type Podcast = {
  number: number;
  displayDate: string;
  title: string;
  slug: string;
};

const getPodcast = async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch podcast');
  return res.json() as Promise<Podcast>;
};

export default async function Podcast() {
  const podcast = await withCache(getPodcast, {
    key: 'podcast',
    expiry: 3600,
  });

  if (!podcast) return <p>Error loading podcast</p>;

  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>

      <Image alt="Syntax Podcast" {...synaxLogo} />
      <time
        style={{
          fontSize: '1.2rem',
          fontWeight: '600',
        }}
      >
        {podcast.displayDate}
      </time>
      <p>{podcast.title}</p>
      <a target="_blank" href={`https://syntax.fm/${podcast.number}/${podcast.slug}`}>
        Listen Now →{' '}
      </a>
    </div>
  );
}
