import Terms from './content.mdx';

export default function TermsPage() {
  return <Terms />;
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Terms and Conditions - Wes Bos',
  } as const;
};
