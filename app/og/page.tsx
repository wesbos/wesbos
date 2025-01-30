'use client';
import React, { Suspense } from 'react';
import H from '../../components/mdxComponents/Headings';
import * as ogcss from '@/styles/OG.module.css';
// import logo from '../assets/images/logo.png';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

function getFontSize(length) {
  if (length > 55) {
    return `5rem`;
  }
  if (length > 32) {
    return `7rem`;
  }
  return `10rem`;
}

function OG() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  if (!searchParams) return null;
  const thumbnail = searchParams.get('thumbnail');
  const link = searchParams.get('url');
  const title = searchParams.get('title');
  console.log({ thumbnail, link, title });
  console.log(link);
  const linkURL = new URL(link);

  // example URL: http://localhost:3000/og?title=Uses&url=https%3A%2F%2Fwesbos.com%2Fuses&thumbnail=%2F_next%2Fimage%3Furl%3D%252F_next%252Fstatic%252Fmedia%252Faeron.b514fb21.jpg%26w%3D1920%26q%3D75
  return (
    <div className={ogcss.main}>
      <div className={ogcss.title}>
        <H
          style={{
            fontSize: getFontSize(title.length),
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </H>
        {thumbnail && <img className={ogcss.thumbnail} src={thumbnail} alt={title} />}
      </div>
      <div className={ogcss.lower}>
        <img src="https://pbs.twimg.com/profile_images/877525007185858562/7G9vGTca_400x400.jpg" alt="Wes Bos" className={ogcss.handsome} />
        <div>
          <p className={ogcss.authorName}>Wes Bos.com</p>
          <p className={ogcss.link}>
            {/* <span className="host">{linkURL.host}</span> */}
            <span className={ogcss.path}>{linkURL.pathname}</span>
          </p>
        </div>
        <img src="/logo.png" alt="logo" className={ogcss.logo} />
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

        `,
        }}
      />
    </div>
  );
}

export default function OGPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OG />
    </Suspense>
  );
}
