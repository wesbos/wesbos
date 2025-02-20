"use client";
import H from "./mdxComponents/Headings";

function getFontSize(length: number) {
  if (length > 55) {
    return `5rem`;
  }
  if (length > 32) {
    return `7rem`;
  }
  return `10rem`;
}

export interface OGProps {
  query: {
    thumbnail?: string;
    url?: string;
    title?: string;
  };
}

export function OG({ query }: OGProps) {
  const { thumbnail, url: link, title = "Wes Bos" } = query;
  const linkURL = new URL(link || "https://wesbos.com");

  return (
    <div className="main">
      <div className="title">
        <H
          style={{
            fontSize: getFontSize(title.length),
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </H>
        {thumbnail && <img className="thumbnail" src={thumbnail} alt={title} />}
      </div>
      <div className="lower">
        <img
          src="https://pbs.twimg.com/profile_images/877525007185858562/7G9vGTca_400x400.jpg"
          alt="Wes Bos"
          className="handsome"
        />
        <div>
          <p className="authorName">Wes Bos.com</p>
          <p className="link">
            <span className="path">{linkURL.pathname}</span>
          </p>
        </div>
        <img src="/logo.png" alt="logo" className="logo" />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: /*css*/ `
            body {
              position: relative;
              z-index: -2;
              margin: 0;
              display: grid;
              & > div,
              & > div > div {
                display: grid;
              }
              nav,
              footer {
                display: none !important;
              }
              /* Some global hacks to override the default styles */
              [class*='ContentStyles'] {
                width: 100%;
                padding: 0;
                max-width: none;
              }
            }

            .main {
              display: grid;
              grid-template-rows: 1fr auto;
              height: 100vh;
              padding: 4rem;
              background: var(--yellow);
              color: black;
            }

            .title {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 2rem;
              align-items: center;
            }

            .thumbnail {
              width: 400px;
              height: 400px;
              object-fit: cover;
              border-radius: 10px;
            }

            .lower {
              display: grid;
              grid-template-columns: auto 1fr auto;
              gap: 2rem;
              align-items: center;
            }

            .handsome {
              width: 100px;
              height: 100px;
              border-radius: 50%;
            }

            .logo {
              width: 100px;
              height: 100px;
            }

            .authorName {
              font-size: 3rem;
              margin: 0;
            }

            .link {
              font-size: 2rem;
              margin: 0;
              color: var(--dark);
            }
          `,
        }}
      />
    </div>
  );
}
