import { compile } from '@mdx-js/mdx';
import { type Fragment, type Jsx, run } from '@mdx-js/mdx';
import * as runtime_ from 'react/jsx-runtime';

import Testttt from '../../posts/transfer-usd-out-of-paypal/paypal.mdx';
import Image, { ImageProps } from 'next/image';
const txt = `
# Hello World
This is a markdown file.
`;


export default async function Test() {

const result = await compile(txt, { baseUrl: import.meta.url });
  return (
    <div>
      <Testttt
        components={{
          img: (props) => {
            console.log(props);
            return <Image width="200" height="200" sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />;
          },
        }}
      />
      <h1>test</h1>
    </div>
  );
}
