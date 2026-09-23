import type { PageProps } from 'waku/router';
import { MetaTags } from '@/components/MetaTags';
import H from '@/components/mdxComponents/Headings';

export default function ApiDocsPage(props: PageProps<string>) {
  return (
    <>
      <MetaTags {...props} title="API Documentation" />
      <H as="h1">API Documentation</H>
      <p>The API metadata for automated agents is published at:</p>
      <ul>
        <li>
          <a href="/.well-known/api-catalog">/.well-known/api-catalog</a>
        </li>
        <li>
          <a href="/.well-known/openid-configuration">/.well-known/openid-configuration</a>
        </li>
        <li>
          <a href="/.well-known/oauth-protected-resource">/.well-known/oauth-protected-resource</a>
        </li>
      </ul>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'API Documentation - Wes Bos',
  } as const;
};
