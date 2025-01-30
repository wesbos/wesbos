import Image from 'next/image';
import Link from 'next/link';
import H from '../../components/mdxComponents/Headings';
import { TimeSince } from './TimeSinceStarting';
export default function AboutPage() {
  return (
    <>
      <H>About</H>
      <p>Hey, I'm Wes Bos.</p>
      <Image width="800" height="400" src="/images/wes.jpg" alt="Wes Bos sits at a table in the direct sunlight pretending to be on his computer" />

      <H as="h3">The Skinny&hellip;</H>

      {/* This is a super annoying part of RSC. I've gotta throw this sentence into another file just to make it work */}
      <TimeSince />

      <p>I use HTML, CSS, JavaScript and TypeScript. Though constantly changing, my focus right now is React.js, Node/Deno, Express, Serverless, Gatsby and Next.js.</p>
      <p>
        I create <Link href="/courses">online courses</Link> and run a <a href="https://syntax.fm">web development podcast</a> called Syntax.
      </p>

      <H as="h3">A little more&hellip;</H>
      <p>
        <strong>I've been in love with web development</strong> for over half my life. Seems weird, right? It's a space of constant improvement and new &amp; exciting technology. I consider myself a hacker in that I'm always using technology to solve my life's problems and ambitions.
      </p>

      <Image width="800" height="400" src="/images/wes-and-scott.jpg" alt="Wes and Scott meet for the very first time" />
      <p>
        📻 Listen to <a href="https://syntax.fm/show/008/wes-bos-origin-story">my origin story</a> if you want a little more info.
      </p>

      <p>
        <strong>I love to teach.</strong> I got my start teaching with{' '}
        <a href="https://www.canadalearningcode.ca/" target="_blank" rel="noreferrer">
          Ladies Learning Code
        </a>{' '}
        and went on to teach part time and full time bootcamps at HackerYou (Now{' '}
        <a href="https://junocollege.com/" target="_blank" rel="noreferrer">
          Juno College
        </a>
        ). I now spend my time making courses, doing workshops and speaking at conferences around the world.
      </p>

      <p>
        <strong>I live</strong> in a really cool city called Hamilton with my <a href="http://kaitbos.com/">wife Kaitlin</a>, two girls, one boy and a pup named Snickers. We spend our summers at our cottage up in beautiful Northern Ontario.
      </p>

      <p>
        <strong>I have a few hobbies. </strong>I've rebuilt hundreds of vintage road racing bikes. I fancy myself as a good cook, enjoyer of cast iron, smoking meat on my Big Green Egg and have been known to make some pretty killer pulled pork. I love tools and I'll try fix anything - appliances, electronics, kids toys and things around the house.
      </p>
      <Image width="800" height="400" src="/images/bos-family.jpg" alt="My beautiful Family" />

      <H as="h3">Bio</H>

      <p>You can stop reading here. This is just a succinct bio that podcast hosts and conference organizers can use to introduce me when they have me on. Otherwise they find a super old one!</p>

      <p>Wes Bos is a Full Stack developer from Canada. Constantly learning, he creates web development courses focused on JavaScript, TypeScript, React, CSS, Node.js and whatever else comes his way. Wes is the co-host of the popular Syntax.fm podcast and has taught over half a million people JavaScript and has spoken at dozens of conferences around the world.</p>
    </>
  );
}
