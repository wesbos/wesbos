import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import H from '../components/mdxComponents/Headings';
import Img from '../components/Img';
import useInterval from '../utils/useInterval';

export default function SpeakingAndTrainingPage({ data }) {
  return (
    <>
      <Helmet>
        <title>Speaking &amp; Training - Wes Bos</title>
      </Helmet>
      <H>Speaking and Training</H>
      <p>
        I'm still working on this page, but if you'd like to have me come speak
        at your conference or do a private workshop at your work, please get in
        touch with me at <a href="mailto:hey@wesbos.com">hey@wesbos.com</a>.
      </p>
      <p>
        I usually like to speak about JavaScript, CSS, Hot Tips, React.js,
        Node.js and related topics. For workshops, I have pre-made workshops on
        Gatsby.js, React.js and several other topics. I am able to create custom
        workshops tailored towards your team.
      </p>
      <p>
        Soon this page will have links to past + upcoming speaking and training
        events.
      </p>
    </>
  );
}
