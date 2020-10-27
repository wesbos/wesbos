import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import H from '../components/mdxComponents/Headings';
import Img from '../components/Img';
import useInterval from '../utils/useInterval';
import { PostMetaTags } from '../components/MetaTags';
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
            title: 'Terms and Conditions',
          },
        }}
      />
      <H>Terms and Conditions</H>
      <H as="h2">Terms</H>
      <p>By accessing Wes Bos’s (WesBos.com) web site, you agreeing to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials, information, software, and content contained in and on WesBos.com’s web site (collectively referred to herein as the “Materials”) are protected by applicable copyright and trademark law. BosType Inc may be referred to herein as “we”, “us”, Wesbos.com or Wes Bos”.</p>
      <H as="h2">Use License</H>
      <p>Put simply, you can't redistribute and/or sell the videos. You may use the code in any of your projects are are free to publish the source on the internet (such as GitHub). You may not record your own video tutorials based on the same content.</p>
      <p>Permission is granted to temporarily download one copy of the Materials on Wes Bos' web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title</p>

      <p>You may not transfer or share access to any of the materials with another person.</p>

      <p>We may terminate your license at any time if we suspect you doing so.</p>
      <H as="h2">Disclaimer</H>

      <p>The Materials are provided "as is". Wes Bos makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Wes Bos does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the Materials or otherwise relating to such Materials or on any web sites linked to this web site.</p>

      <H as="h2">Disclaimer</H>

      <p>In no event shall Wes Bos or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the Materials, even if Wes Bos or a Wes Bos authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

      <H as="h2">Terms of Use Updates</H>
      <p>Wes Bos may revise these Terms and Conditions of Use at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>

    </>
  );
}
