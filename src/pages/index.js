import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import WelcomeStyles from '../assets/styles/WelcomeStyles';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

export default function HomePage({ data, path }) {
  const { title, description } = data.site.siteMetadata;

  return (
    <div className="welcome">
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: 'Wes Bos',
          },
        }}
      />
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: description }]}
        title="Wes Bos - Full Stack Developer"
      />
      <WelcomeStyles>
        <H as="h2">Hey, I'm Wes&nbsp;Bos.</H>

        <H as="h2" looksLike="h1">
          <span className="highlight">
            I'm here to help you become a really good web developer.
          </span>
        </H>

        <p>I'm a full Stack JavaScript developer from Canada 🇨🇦.</p>
        <p>
          I create <Link to="/courses">free + premium courses</Link> and do a{' '}
          <a href="https://syntax.fm">twice-weekly podcast</a> called Syntax.
        </p>
        <p>
          You can <Link to="/about">read more about me here</Link>, but stick
          around if you like CSS, JavaScript, mediocre jokes, learning new
          things or BBQ Tips.
        </p>
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
