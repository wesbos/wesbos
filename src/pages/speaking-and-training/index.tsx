import Content from './content.mdx';

export default function SpeakingAndTrainingPage() {
  return <Content />;
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Speaking and Training - Wes Bos',
  } as const;
};
