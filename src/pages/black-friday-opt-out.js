import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import H from '../components/mdxComponents/Headings';
import Img from '../components/Img';
import useInterval from '../utils/useInterval';
import { PostMetaTags } from '../components/MetaTags';

export default function OptOut({ data, path }) {
  return (
    <div>
      <H>No Sweat!</H>
      <p>You won't hear from me for the rest of Black Friday.</p>
      <p>Have a good one!</p>
    </div>
  );
}
