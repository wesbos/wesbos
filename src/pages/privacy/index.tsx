import mdxComponents from '@/components/mdxComponents';
import type { PageProps } from 'waku/router';
import { MetaTags } from '../../components/MetaTags';
import Privacy from './content.mdx';
export default function PrivacyPage(props: PageProps<'/privacy'>) {
  return (
    <>
      <MetaTags {...props} />
      <Privacy components={mdxComponents} />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Privacy Policy - Wes Bos',
  } as const;
};
