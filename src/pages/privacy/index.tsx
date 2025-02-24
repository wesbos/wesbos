import Privacy from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";
import mdxComponents from '@/components/mdxComponents';
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
