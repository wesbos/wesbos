import React from 'react';
import { styled } from '@/styled-system/jsx';

const BannerStyles = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  font-size: 12px;
  gap: 1rem;
  align-items: stretch;
  background: #1a69d0;
  color: white;
  margin: 2rem 0;
  font-family: var(--baseFont);
  p {
    margin: 5px 0;
  }
  a {
    text-decoration-color: var(--yellow);
    color: white;
  }
  strong {
    color: var(--yellow);
  }
  img {
    height: 100%;
    align-self: stretch;
    width: 220px;
    object-fit: contain;
    @media (max-width: 600px) {
      display: none;
    }
  }
  .text {
    padding: 0 1rem;
  }
`;

export function BeginnerJavaScript() {
  return (
    <BannerStyles>
      <div>
        <img src="https://images.wesbos.com/upload/w_700,q_auto,f_auto/v1621453897/wesbos.com/bjs.png" alt="Beginner JavaScript" />
      </div>
      <div className="text">
        <p>Enjoy these notes? Want to Slam Dunk JavaScript?</p>

        <p>
          These are notes based on my{' '}
          <a href="https://BeginnerJavaScript.com" target="_blank" rel="noreferrer">
            Beginner JavaScript
          </a>{' '}
          Video Course. It's a fun, exercise heavy approach to learning Modern JavaScript from scratch.
        </p>

        <p>
          Use the code <strong>BEGINNERJS</strong> for an extra $10 off.
        </p>

        <p>
          <a href="https://BeginnerJavaScript.com" target="_blank" rel="noreferrer">
            BeginnerJavaScript.com
          </a>
        </p>
      </div>
    </BannerStyles>
  );
}
