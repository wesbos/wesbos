"use client";
import styled from 'styled-components';

export const NavStyles = styled.nav`
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

export const NavUl = styled.ul`
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

export const NavLi = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  align-content: center;
  grid-gap: 2rem;
  margin: 1rem;
  .hideYoSelf {
    visibility: hidden;
  }
  &.row2 {
    margin: 0;
    & > *,
    span {
      transform: scale(0.55);
    }
    small.top,
    small.bottom {
      display: none;
    }
  }
  &:after {
    content: '×';
    color: var(--yellow);
    display: flex;
    align-items: center;
  }
  &:last-child:after {
    display: none;
  }
  a {
    font-size: 3.2rem;
    font-family: var(--radnika);
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 400;
      text-align: right;
      line-height: 10px;
      position: relative;
      pointer-events: none;
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
