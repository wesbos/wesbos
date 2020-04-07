import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import WelcomeStyles from '../assets/styles/WelcomeStyles';
import H from '../components/mdxComponents/Headings';

export default function HomePage({ data }) {
  const { title, description } = data.site.siteMetadata;

  return (
    <div className="welcome">
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: description }]}
        title={title}
      />
      <WelcomeStyles>
        <H as="h2">Hey, I'm Wes Bos.</H>

        <H as="h2" looksLike="h1">
          <span className="highlight">
            I'm here to help you become a really good web developer.
          </span>
        </H>

        <p>I'm a full Stack JavaScript developer from Canada.</p>
        <p>
          I create <Link to="/courses">free + premium courses</Link> and do a{' '}
          <a href="https://syntax.fm">twice-weekly podcast</a> called Syntax.
        </p>
        <p>
          You can <Link to="/about">read more about me here</Link>, but stick
          around if you like:
        </p>
        <ul>
          <li>mediocre jokes</li>
          <li>pretty good explanations on how web development works</li>
          <li>🔥 Hot Tips</li>
          <li>BBQ</li>
        </ul>
        <p />
      </WelcomeStyles>
    </div>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
