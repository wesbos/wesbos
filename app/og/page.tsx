'use client';
import React from 'react';
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

export default function OG() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  if (!searchParams) return null;
  const thumbnail = searchParams.get('thumbnail');
  const link = searchParams.get('url');
  const title = searchParams.get('title');
  console.log({ thumbnail, link, title });
  const linkURL = new URL(link);

  // example URL: http://localhost:3000/thumbnail?title=Uses&url=https%3A%2F%2Fwesbos.com%2Fuses&thumbnail=%2F_next%2Fimage%3Furl%3D%252F_next%252Fstatic%252Fmedia%252Faeron.b514fb21.jpg%26w%3D1920%26q%3D75
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
      </div>
  );
}
