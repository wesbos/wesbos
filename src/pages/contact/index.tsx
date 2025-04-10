import mdxComponents from '@/components/mdxComponents';
import type { PageProps } from 'waku/router';
import { MetaTags } from '../../components/MetaTags';
import Contact from './content.mdx';

export default async function ContactPage(props: PageProps<'/contact'>) {
  return (
    <div>
      <MetaTags {...props} />
      <Contact components={mdxComponents} />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
