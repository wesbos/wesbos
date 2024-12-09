import Image from 'next/image'
const url = `https://syntax.fm/api/shows/latest`;
import logo from '@/public/images/syntax-logo.jpg';
import { FooterBlock, FooterHeading } from '@/styles/FooterStyles.module.css';

export default async function Podcast() {
  const podcast = await fetch(url).then((res) => res.json());
  if(!podcast) return <p>Hrm.. </p>;
  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>
      <Image width="500" alt="Syntax Podcast" src={logo} />
      <time style={{
          fontSize: '1.2rem',
          fontWeight: '600',
        }}>{podcast.displayDate}</time>
      <p>{podcast.title}</p>
      <a href={`https://syntax.fm${podcast.slug}`}>Listen Now → </a>
    </div>
  );
}
