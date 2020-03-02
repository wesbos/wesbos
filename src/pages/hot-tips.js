import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import format from 'date-fns/format';
import Layout from '../components/Layout';
import PostGrid, { PostGridItem } from '../styles/PostGrid';
import H from '../components/mdxComponents/Headings';

const HotTips = function({ data }) {
  if (!data) return <p>Shooooot! No data found!</p>;
  console.log(data);
  return (
    <Layout>
      <a
        className="twitter-timeline"
        href="https://twitter.com/wesbos/timelines/1189618481672667136?ref_src=twsrc%5Etfw"
      >
        🔥 Hot Tips from Wes Bos - Curated tweets by wesbos
      </a>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      />
    </Layout>
  );
};

export default HotTips;
