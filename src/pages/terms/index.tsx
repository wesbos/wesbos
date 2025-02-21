import Terms from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";

export default function TermsPage(props: PageProps<'/terms'>) {
  return (
    <>
      <MetaTags {...props} />
      <Terms />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Terms and Conditions - Wes Bos',
  } as const;
};
