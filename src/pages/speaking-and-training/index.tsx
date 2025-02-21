import Content from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";

export default function SpeakingAndTrainingPage(props: PageProps<'/speaking-and-training'>) {
  return (
    <>
      <MetaTags {...props} />
      <Content />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Speaking and Training - Wes Bos',
  } as const;
};
