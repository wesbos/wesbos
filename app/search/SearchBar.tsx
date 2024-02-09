'use client';

import { useState } from 'react';
import { Results } from './page';

export function SearchBar() {
  return (
    <div>
      <form>
        <input type="search" placeholder="search..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export function SearchWrapper({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Search Wrapper</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <SearchBar />
      <Results count={count} />
    </div>
  );
}
