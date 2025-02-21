import { TableOfContentsLanding } from '../../components/TableOfContentsNew';
import H from '../../components/mdxComponents/Headings';
import { MetaTags } from '../../components/MetaTags';
import type { PageProps } from "waku/router";

export default function JavaScriptPage(props: PageProps<'/javascript'>) {
  return (
    <>
      <MetaTags {...props} title="Beginner JavaScript Notes &amp; Reference" />
      <H>Beginner JavaScript Notes &amp; Reference</H>

      <p>Hey! Welcome to my Beginner JavaScript Notes + Reference.</p>

      <p>
        These notes are a free resource, based on my <a href="https://BeginnerJavaScript.com">Beginner JavaScript Video course</a>.
        They can be used as a stand alone guide, along with the videos or a quick reference for all the different parts of JavaScript
        like the <a href="/javascript/02-functions/different-ways-to-declare-functions">different ways to declare a function</a>.
      </p>

      <p>
        The code written in these notes is available in the <a href="https://github.com/wesbos/beginner-javascript">Beginner JavaScript repo</a> on github.
      </p>

      <p>
        Did I miss something? Think you could add a better example? Find a spelling mistake? All the notes are open source and edits are greatly appreciated!
      </p>

      <TableOfContentsLanding />
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'JavaScript Notes & Reference - Wes Bos',
  } as const;
};
