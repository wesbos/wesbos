import Privacy from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";

export default function PrivacyPage(props: PageProps<'/privacy'>) {
  return (
    <>
      <MetaTags {...props} />
      <Privacy />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Privacy Policy - Wes Bos',
  } as const;
};
