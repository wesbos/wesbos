import { SearchBar, SearchWrapper } from './SearchBar';

export default function SearchPage() {
  return (
    <div>
      <SearchWrapper>
        <h1>Search Page</h1>
        <SearchBar />
        <Results />
      </SearchWrapper>
    </div>
  );
}

export function Results({ count }: { count: number }) {
  return (
    <div>
      <h2>Results</h2>
      <p>
        Serverside count: {count} Generated on {Date.now()}
      </p>
    </div>
  );
}
