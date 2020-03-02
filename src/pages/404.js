import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <H>Shoot, eh!</H>
        <p>404.</p>
        <p>
          This page doesn't exist. If you think this is an error{' '}
          <Link to="/contact">contact me</Link>
        </p>
      </Layout>
    );
  }
}

export default NotFoundPage;
