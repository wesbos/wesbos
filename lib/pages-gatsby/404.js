import React from 'react';
import Link from 'next/link';
import H from '../../components/mdxComponents/Headings';

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <H>Shoot, eh!</H>
        <p>404.</p>
        <p>
          This page doesn't exist. If you think this is an error <Link href="/contact">contact me</Link>
        </p>
      </>
    );
  }
}

export default NotFoundPage;
