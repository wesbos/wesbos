import React from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';

export default function Nav() {
  return <nav>
    <ul>
      <li>
        <Link to="/">Wes Bos</Link>
      </li>
      <li>
        <Link to="/blog">
          <small>free + premium</small>
          {' '}Courses
        </Link>
      </li>
      <li>
        <a href="https://syntax.fm">
          <small>Syntax</small>
          {' '}Podcast{' '}
          <small>Web Development</small>
        </a>
      </li>

      <li>
        <Link to="/about">
          <small>more</small>
          {' '}About{' '}
          <small>me</small>
        </Link>
      </li>

      <li>
        <Link to="/blog">
          <small>the</small>
          {' '}Blog
        </Link>
      </li>
      <li>
        <Link to="/blog">
          <small>real life</small>
          {' '}Speaking{' '}
          <small>and training</small>
        </Link>
      </li>
      <li>
        <Link to="/blog">
          <small>I want to</small>
          {' '}Contact{' '}
          <small>you</small>
        </Link>
      </li>
    </ul>

  </nav>
}
