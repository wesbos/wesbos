import Contact from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";
import mdxComponents from '@/components/mdxComponents';
import { Break } from './Break';

export default async function ContactPage(props: PageProps<'/contact'>) {
  return (
    <div>
      <MetaTags {...props} />
      <Break />
      <Contact components={mdxComponents} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
