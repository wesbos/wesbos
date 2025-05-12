import Content from './content.mdx';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from 'waku/router';
import mdxComponents from '@/components/mdxComponents';
export default function SpeakingAndTrainingPage(props: PageProps<'/speaking-and-training'>) {
  return (
    <>
      <MetaTags {...props} />
      <Content components={mdxComponents} />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Speaking and Training - Wes Bos',
  } as const;
};
