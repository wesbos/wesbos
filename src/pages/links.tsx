import type { PageProps } from 'waku/router';
import { MetaTags } from '../components/MetaTags';
import H from '../components/mdxComponents/Headings';
import styles from '../styles/LinksStyles.module.css';

// Add, remove, or reorder links here. They appear in this order on /links.
const links = [
  { label: 'Home Page', href: '/' },
  { label: 'Syntax', href: 'https://syntax.fm' },
  { label: 'Download Codex + ChatGPT', href: 'https://www.chatgpt.com/download/' },
  { label: 'Thrift Store Finder Github Repo', href: 'https://github.com/wesbos/yard-sale' },
];

export default function LinksPage(props: PageProps<'/links'>) {
  return (
    <>
      <MetaTags
        {...props}
        title="Links"
        description="Quick links to Wes Bos's home page, the Syntax podcast, and ChatGPT."
      />
      <main className={styles.linksPage}>
        <header>
          <H>Hey, I'm Wes Bos.</H>
        </header>
        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>
                <span>{label}</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
