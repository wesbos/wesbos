import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logo from '../assets/images/logo.png';
import H from './mdxComponents/Headings';

const NavStyles = styled.nav`
  border-bottom: 5px solid ${props => props.theme.yellow};
  display: grid;
  grid-template-columns: 1fr;
  ul {
    background: white;
    display: flex;
    justify-content: center;
    list-style: none;
    margin: 0;
    /* margin-bottom: 2rem; */
    padding: 3rem 2rem 2rem 2rem;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.06);
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
      &:last-child:after {
        display: none;
      }
    }
    a {
      font-size: 3.2rem;
      font-family: 'radnika';
      color: black;
      text-decoration: none;
      line-height: 1;
      &[aria-current='page'] {
        .grit {
          text-decoration: underline;
          text-decoration-color: ${props => props.theme.yellow};
        }
      }
      small {
        font-size: 1.3rem;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 400;
        text-align: right;
        line-height: 10px;
      }
    }
  }
  h1 {
    display: grid;
    justify-items: center;
    margin-bottom: -4rem;
    z-index: 2;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <h1>
        <Link to="/">
          <img width="200" src={logo} alt="Wes Bos" />
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/courses">
            <small>free + premium</small> <H as="span">Courses</H>
          </Link>
        </li>
        <li>
          <a href="https://syntax.fm">
            <small className="top">Syntax</small> <H as="span">Podcast</H>{' '}
            <small className="bottom">Web Development</small>
          </a>
        </li>

        <li>
          <Link to="/about">
            <small className="top">more</small> <H as="span">About</H>{' '}
            <small className="bottom">me</small>
          </Link>
        </li>

        <li>
          <Link to="/blog">
            <small className="top">the</small> <H as="span">Blog</H>
            <small className="bottom">+ 🔥 Tips</small>
          </Link>
        </li>
        <li>
          <Link to="/speaking-and-training">
            <small className="top">real life</small> <H as="span">Speaking</H>{' '}
            <small className="bottom">and training</small>
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <small className="top">I want to</small> <H as="span">Contact</H>{' '}
            <small className="bottom">you</small>
          </Link>
        </li>
      </ul>
    </NavStyles>
  );
}
