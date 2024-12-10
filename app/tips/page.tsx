import * as all from './test.mdx';

export default function HotTips() {
  console.log(all);
  const Content = all.default;
  return (
    <div>
      <p>TIPS GO HERE</p>
      <Content />
    </div>
  );
}
