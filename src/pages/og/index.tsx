import { OG } from '../../components/OG';

export default function OGPage({ query }: { query: string }) {
  const queryObject = new URLSearchParams(query);
  const url = queryObject.get('url') || '';
  const title = queryObject.get('title') || '';
  const thumbnail = queryObject.get('thumbnail') || '';
  return <OG query={{ url, title, thumbnail }} />;
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
