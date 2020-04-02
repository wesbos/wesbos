import React from 'react';
import { graphql } from 'gatsby';
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
        <H as="h2">
          Ohh Hey!
          <br />
          I'm Wes Bos
        </H>
        <p>
          Thanks for stopping by! I'm here to help you become a really good web
          developer.
        </p>
        <p>I'm a fullstack JavaScript developer from Canada.</p>
        <p>
          I create free + premium courses and do a twice-weekly podcast called
          Syntax.
        </p>
        <p>Stick around if you like:</p>
        <ul>
          <li>mediocre jokes</li>
          <li>pretty good explanations on how web development works</li>
          <li>Hot Tips</li>
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
