import { Image } from '@/components/Image';
const url = `https://syntax.fm/api/shows/latest`;
import { FooterBlock, FooterHeading } from '@/styles/FooterStyles.module.css';

type Podcast = {
  number: number;
  displayDate: string;
  title: string;
  slug: string;
}

export default async function Podcast() {
  const podcast = await fetch(url).then((res) => res.json() as Promise<Podcast>).catch(err => {
    console.log(`Error fetching podcast`);
  });
  if(!podcast) return <p>Hrm.. </p>;
  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>
      <Image width={500} height={500} alt="Syntax Podcast" src="/images/syntax-logo.jpg" />
      <time
        style={{
          fontSize: '1.2rem',
          fontWeight: '600',
        }}
      >
        {podcast.displayDate}
      </time>
      <p>{podcast.title}</p>
      <a href={`https://syntax.fm${podcast.slug}`}>Listen Now → </a>
    </div>
  );
}
