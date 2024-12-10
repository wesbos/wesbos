import { parseContent } from '@/lib/getPosts';
import * as all from './test.mdx';

export default async function HotTips() {
  console.log(all);
  const allParsed = await parseContent(all);
  console.log(allParsed);
  const Content = all.default;
  return (
    <div>
      <p>TIPS GO HERE</p>
      <Content />
    </div>
  );
}
