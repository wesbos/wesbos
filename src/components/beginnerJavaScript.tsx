import { BannerStyles } from '@/styles/BannerStyles.module.css';
import React from 'react';
export function BeginnerJavaScript() {
  return (
    <div className={BannerStyles}>
      <div>
        <img
          src="https://images.wesbos.com/upload/w_700,q_auto,f_auto/v1621453897/wesbos.com/bjs.png"
          alt="Beginner JavaScript"
        />
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
    </div>
  );
}
