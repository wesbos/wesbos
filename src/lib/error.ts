'use server';
import fs from 'fs';

export async function throwError() {
  // read files in current folder
  console.log('SSR?', import.meta.env.SSR);
  throw new Error('Thrown Error Server side!');
}
