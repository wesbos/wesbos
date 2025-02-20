import Contact from './content.mdx';

export default function ContactPage() {
  return <Contact />;
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Contact - Wes Bos',
  } as const;
};
