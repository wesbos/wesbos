import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import H from '../components/mdxComponents/Headings';
import Img from '../components/Img';
import useInterval from '../utils/useInterval';
import { PostMetaTags } from '../components/MetaTags';

function useOldGuy({ update = 60000 }) {
  const startingDate = 940001932590;
  const birth = 572195051960;
  const [timeSinceStarting, setTime] = useState(Date.now() - startingDate);
  const [age, setAge] = useState(Date.now() - birth);
  useInterval(() => {
    setTime(Date.now() - startingDate);
    setAge(Date.now() - birth);
  }, update);
  return {
    timeSinceStarting,
    timeAsYears: Math.floor(timeSinceStarting / 1000 / 60 / 60 / 24 / 365),
    age,
    // this doesn't account for leap years and will be wrong in about 1400 years
    ageAsYears: Math.floor(age / 1000 / 60 / 60 / 24 / 365),
  };
}

function TimeSinceStarting() {
  const { timeSinceStarting } = useOldGuy({
    update: 100,
  });
  return <>{timeSinceStarting}</>;
}

export default function AboutPage({ data, path }) {
  const { age, ageAsYears, timeSinceStarting, timeAsYears } = useOldGuy({
    update: 60000,
  });
  return (
    <>
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: 'About',
            image: `${
              process.env.GATSBY_DEPLOY_PRIME_URL || `http://localhost:8888`
            }${data.wes.childImageSharp.fluid.src}`,
          },
        }}
      />
      <H>About</H>
      <p>Hey, I'm Wes Bos.</p>
      <Img
        image={data.wes}
        alt="Wes Bos sits at a table in the direct sunlight pretending to be on his computer"
      />

      <H as="h3">The Skinny&hellip;</H>
      <p>
        I'm a web developer, teacher and speaker from Hamilton, Ontario 🇨🇦. I'm{' '}
        <span title={`That's ${age} ms!`}>{ageAsYears}</span> years old and I've
        been{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://web.archive.org/web/20040608163410/http://www.wesbos.com/"
        >
          making websites
        </a>{' '}
        for about {timeAsYears} years - or <em>exactly</em>{' '}
        <TimeSinceStarting /> milliseconds!
      </p>

      <p>
        I use HTML, CSS and JavaScript. Though constantly changing, my focus
        right now is React.js, Node, Express, Lambda, Gatsby and Next.js
      </p>
      <p>
        I create <Link to="/courses">online courses</Link> and run a{' '}
        <a href="https://syntax.fm">web development podcast</a> called Syntax.
      </p>

      <H as="h3">A little more&hellip;</H>
      <p>
        <strong>I've been in love with web development</strong> for over half my
        life. Seems weird, right? It's a space of constant improvement and new
        &amp; exciting technology. I consider myself a hacker in that I'm always
        using technology to solve my life's problems and ambitions.
      </p>

      <Img
        image={data.wesandscott}
        alt="Wes and Scott meet for the very first time"
      />
      <p>
        📻 Listen to{' '}
        <a href="https://syntax.fm/show/008/wes-bos-origin-story">
          my origin story
        </a>{' '}
        if you want a little more info.
      </p>

      <p>
        <strong>I love to teach.</strong> I got my start teaching with{' '}
        <a href="https://www.canadalearningcode.ca/" target="_blank">
          Ladies Learning Code
        </a>{' '}
        and went on to teach part time and full time bootcamps at HackerYou (Now{' '}
        <a href="https://junocollege.com/" target="_blank">
          Juno College
        </a>
        ). I now spend my time making courses, doing workshops and speaking at
        conferences around the world.
      </p>

      <p>
        <strong>I live</strong> in a really cool city called Hamilton in its
        downtown core in a super old house with my{' '}
        <a href="http://kaitbos.com/">wife Kaitlin</a>, two girls, one boy and a
        pup named Snickers. We spend our summers at our cottage up in beautiful
        Northern Ontario.
      </p>

      <p>
        <strong>I have a few hobbies. </strong>I've rebuilt hundreds of vintage
        road racing bikes. I like to fancy myself as a good cook, I’m obsessed
        with cast iron cookware, smoking meat on my Big Green Egg and have been
        known to make some pretty killer pulled pork. I've recently dipped my
        toes into fermentation and curing.
      </p>
      <Img image={data.family} alt="My beautiful Family" />
    </>
  );
}

// this is silly
export const query = graphql`
  query {
    wes: file(relativePath: { eq: "wes.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wesandscott: file(relativePath: { eq: "wes-and-scott.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    family: file(relativePath: { eq: "bos-family.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
