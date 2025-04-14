'use client';

import { throwError } from '@/lib/error';

export function Break() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error('Thrown Error - Imported as component from _layout.tsx');
        }}
      >
        Break the world
      </button>

      <h2>Server Side Error via a form Action:</h2>
      <form action={throwError}>
        <button type="submit">Throw Serverside Error</button>
      </form>
    </div>
  );
}
