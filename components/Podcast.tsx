import { PodStyles } from '@/lib/assets/styles/PodStyles';
import Image from 'next/image'
const url = `https://syntax.fm/api/shows/latest`;
import logo from '@/public/images/syntax-logo.jpg';
export default async function Podcast() {
  const podcast = await fetch(url).then((res) => res.json());
  if(!podcast) return <p>Hrm.. </p>;
  return (
    <PodStyles>
      <h3>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>
      <Image width="500" alt="Syntax Podcast" src={logo} />
      <time>{podcast.displayDate}</time>
      <p>{podcast.title}</p>
      <a href={`https://syntax.fm${podcast.slug}`}>Listen Now → </a>
    </PodStyles>
  );
}
