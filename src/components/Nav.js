import React from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';
import logo from '../assets/images/logo.png';

const NavStyles = styled.nav`
  border-bottom: 5px solid ${props => props.theme.yellow};
  display: grid;
  grid-template-columns: auto 1fr;
  ul {
    display: flex;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: start;
      align-content: center;
      grid-gap: 2rem;
      margin: 1rem;
      &:after {
        content: '×';
        display: block;
        color: ${props => props.theme.yellow};
      }
      &:last-child:after { display: none; }
    }
    a {
      font-size: 3.2rem;
      font-family: 'radnika';
      color: black;
      text-decoration:none;
      line-height: 1;
      small {
        font-size: 1.3rem;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 400;
        text-align: right;
        line-height: 10px;
      }
    }
  }
`;

export default function Nav() {
  return <NavStyles>
    <h1>
      <Link to="/">
        <img width="200" src={logo} alt="Wes Bos" />
      </Link>
    </h1>
    <ul>
      <li>
        <Link to="/blog">
          <small>free + premium</small>
          {' '}Courses
        </Link>
      </li>
      <li>
        <a href="https://syntax.fm">
          <small className="top">Syntax</small>
          {' '}Podcast{' '}
          <small className="bottom">Web Development</small>
        </a>
      </li>

      <li>
        <Link to="/about">
          <small className="top">more</small>
          {' '}About{' '}
          <small className="bottom">me</small>
        </Link>
      </li>

      <li>
        <Link to="/blog">
          <small className="top">the</small>
          {' '}Blog
        </Link>
      </li>
      <li>
        <Link to="/blog">
          <small className="top">real life</small>
          {' '}Speaking{' '}
          <small className="bottom">and training</small>
        </Link>
      </li>
      <li>
        <Link to="/blog">
          <small className="top">I want to</small>
          {' '}Contact{' '}
          <small className="bottom">you</small>
        </Link>
      </li>
    </ul>

  </NavStyles>
}
