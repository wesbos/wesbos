import Privacy from './content.mdx';

export default function PrivacyPage() {
  return <Privacy />;
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Privacy Policy - Wes Bos',
  } as const;
};
