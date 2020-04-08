import React from 'react';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

export default function ContactPage({ path }) {
  return (
    <>
      <H>Contact</H>
      <p>
        Hey! I get lots of email, so please scan this page before firing one
        off. Don't be afraid to email me, it just might take a few days or week
        for me to get back to you 😃.
      </p>
      <p>
        <strong>If you want me to work for you</strong>, I am not accepting any
        client work at the moment, but I'd recomend you{' '}
        <a href="https://junocollege.com/alumni/freelancers">
          hire a Juno college
        </a>{' '}
        freelancer - they are great!
      </p>

      <p>
        <strong>If you need help with a course</strong>, please jump into the{' '}
        <a href="https://wesbos.slack.com">Slack channel</a> and have myself or
        someone from the support help you.
      </p>
      <p>
        <strong>
          If you want to know what font, theme, computer or toilet paper I use
        </strong>
        , all that info is available on my <a href="/uses">/uses</a> page.
      </p>
      <p>
        <strong>If you are a recruiter</strong>, I love you, but please don’t
        call or email me 🙂. I'm also not able to help you find someone for your
        position.
      </p>
      <p>
        <strong>If you need a receipt for a course</strong>, you can get that on
        your <a href="https://courses.wesbos.com">courses.wesbos.com</a>{' '}
        dashboard.
      </p>
      <p>
        <strong>If you want career or development advice</strong>, I'm happy to
        help as best I can. I prefer you submit it as a potluck question on{' '}
        <a href="https://syntax.fm/">Syntax.fm</a> so the greater community can
        benefit, but I'll still try answer if you want to privately!
      </p>

      <p>
        <strong>I will absolutely take your free stuff</strong>. If you want to
        send me a sticker, tshirt (large), hot sauce or honda civic. I can't
        promise I'll share or talk about your thing, but if it's cool I likely
        will!
      </p>
      <pre>
        📫 7-2 King Street West, PO Box #57016, Hamilton, Ontario L8P 4W9 Canada
      </pre>

      <p>
        <strong>You did it!</strong> For everything else including{' '}
        <strong>course suggestions</strong>, <strong>conference invites</strong>
        , <strong>private training</strong>,{' '}
        <strong>podcast sponsorship</strong> and <strong>BBQ tips</strong>,
        please email <a href="mailto:hey@wesbos.com">hey@wesbos.com</a>
      </p>

      <p>Here are a few tips on writing me:</p>
      <ul>
        <li>Use paragraphs, avoid large walls of text.</li>
        <li>Number your asks if there are multiple</li>
        <li>Keep it as short as you can</li>
        <li>
          Post code on a git repo, <a href="https://codepen.io">Codepen</a> or
          smaller stuff or errors in a{' '}
          <a href="https://gist.github.com/">Gist</a>. Screenshots are helpful
          too!
        </li>
      </ul>

      <p>Thanks, have a great day!</p>

      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: `Contact`,
          },
        }}
      />
    </>
  );
}
