

import { cssModuleIndexMaker } from './lib/createStyleIndex';
export async function register() {
  cssModuleIndexMaker();
  console.log('register');
  return;
}
