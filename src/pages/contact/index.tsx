import Contact from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";


export default function ContactPage(props: PageProps<'/contact'>) {
  return (
    <div>
      <MetaTags {...props} />
      <Contact />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
