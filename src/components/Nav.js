import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import logo from '../assets/images/logo.png';
import H from './mdxComponents/Headings';
import useRowFinder from '../utils/useRowFinder';

const NavStyles = styled.nav`
  border-bottom: 5px solid var(--yellow);
  display: grid;
  grid-template-columns: 1fr;
  h1 {
    display: grid;
    justify-items: center;
    margin-bottom: -4rem;
    z-index: 2;
  }
  @media (max-width: 550px) {
    ul {
      padding: 2.5rem 1rem 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      a > span {
        display: block;
        padding: 1rem 0;
      }
      span.grit {
        margin: 0;
      }
      a:hover {
        span:before {
          display: none;
        }
      }
    }
  }
`;

const NavUl = styled.ul`
  background: var(--light);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 3rem 2rem 2rem 2rem;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.06);
  @media (max-width: 550px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const NavLi = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  align-content: center;
  grid-gap: 2rem;
  margin: 1rem;
  .hideYoSelf {
    visibility: hidden;
  }
  ${props =>
    props.row >= 2 &&
    css`
      margin: 0;
      & > *,
      span {
        transform: scale(0.55);
      }
      small.top,
      small.bottom {
        display: none;
      }
    `}
  &:after {
    content: '×';
    display: block;
    color: var(--yellow);
  }
  &:last-child:after {
    display: none;
  }
  a {
    font-size: 3.2rem;
    font-family: 'radnika';
    color: var(--dark);
    text-decoration: none;
    line-height: 1;
    &[aria-current='page'],
    &.current-parent {
      .grit {
        text-decoration: underline;
        text-decoration-color: var(--yellow);
      }
    }
    small {
      font-size: 1.3rem;
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 400;
      text-align: right;
      line-height: 10px;
      position: relative;
    }
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    margin: 0;
    text-align: center;
    /* This gets rid of the X */
    &:after {
      display: none;
    }
    a {
      &:before {
        display: none;
      }
    }
    & > *,
    span {
      transform: scale(1);
      font-size: 1.7rem;
    }
    small.top,
    small.bottom {
      display: none;
    }
    span.grit {
      padding: 0;
    }
  }
`;
export default function Nav({ pageContext }) {
  const { ref, getRow } = useRowFinder();
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          resize(width: 400) {
            src
          }
        }
      }
    }
  `);
  return (
    <NavStyles>
      <h1>
        <Link to="/">
          <img
            width="200"
            src={data.logo.childImageSharp.resize.src}
            alt="Wes Bos"
          />
        </Link>
      </h1>
      <NavUl ref={ref}>
        <NavLi row={getRow(0)}>
          <Link to="/courses">
            <small className="top">free + premium</small>
            <H as="span">Courses</H>
            <small className="bottom hideYoSelf">x</small>
          </Link>
        </NavLi>
        <NavLi row={getRow(1)}>
          <a href="https://syntax.fm" target="_blank" rel="noreferrer noopener">
            <small className="top">The Syntax</small>
            <H as="span">Podcast</H>{' '}
            <small className="bottom">Web Development</small>
          </a>
        </NavLi>
        <NavLi row={getRow(2)}>
          <Link to="/about">
            <small className="top">more</small>
            <H as="span">About</H>
            <small className="bottom">me</small>
          </Link>
        </NavLi>

        <NavLi row={getRow(3)}>
          <Link
            to="/blog"
            className={
              pageContext.collection === 'post' &&
              !pageContext.slug.includes('uses')
                ? 'current-parent'
                : null
            }
          >
            <small className="top">the</small>
            <H as="span">Blog</H>
            <small className="bottom hideYoSelf">x</small>
          </Link>
        </NavLi>
        <NavLi row={getRow(4)}>
          <Link
            to="/tips"
            className={
              pageContext.collection === 'tip' ? 'current-parent' : null
            }
          >
            <small className="top">🔥</small>
            <H as="span">Tips</H>
            <small className="bottom">real spicy</small>
          </Link>
        </NavLi>
        <NavLi row={getRow(5)}>
          <Link to="/speaking-and-training">
            <small className="top">real life</small>
            <H as="span">Speaking</H>{' '}
            <small className="bottom">and training</small>
          </Link>
        </NavLi>
        <NavLi row={getRow(6)}>
          <Link to="/uses">
            <small className="top">what font?!</small>
            <H as="span">/uses</H>{' '}
            <small className="bottom">what theme!?</small>
          </Link>
        </NavLi>
        <NavLi row={getRow(7)}>
          <Link to="/contact">
            <small className="top">You want to</small>
            <H as="span">Contact</H>
            <small className="bottom">me</small>
          </Link>
        </NavLi>
      </NavUl>
    </NavStyles>
  );
}
