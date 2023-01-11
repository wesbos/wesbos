import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import dirty from './styles/Dirty';

const PaginationStyles = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
  margin: 2rem 0;
  background: var(--yellow);
  justify-items: center;
  align-items: center;
  ${dirty}
  --rotate: 0.243deg;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  & > * {
    display: inline;
    ${dirty}
    background-color: var(--light);
    text-decoration: none;
    padding: 4px;
    margin: 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    &:nth-child(1) {
      --rotate: -2deg;
      margin-left: -10px;
    }
    &:nth-child(2) {
      --rotate: 2deg;
    }
    &:nth-child(3) {
      --rotate: -1.5deg;
    }
    &:hover {
      --rotate: 3deg;
      --scale: 1.1;
    }
  }
  a[disabled] {
    /* opacity: 0.5; */
    pointer-events: none;
    text-decoration: line-through;
  }
`;

export default function Pagination({ totalCount, currentPage = 1, pathPrefix }) {
  const totalPages = Math.ceil(totalCount / 10);
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;
  return (
    <PaginationStyles>
      <Link disabled={prevPage <= 0 ? true : null} to={`${pathPrefix}${prevPage}`}>
        ← Prev 10 please
      </Link>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <Link disabled={nextPage > totalPages ? true : null} to={nextPage > totalPages ? null : `${pathPrefix}${nextPage}`}>
        {nextPage > totalPages ? `That's all Folks` : `10 More please →`}
      </Link>
    </PaginationStyles>
  );
}
