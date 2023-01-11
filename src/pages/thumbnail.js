import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyles from '../components/styles/GlobalStyles';
import H from '../components/mdxComponents/Headings';
import logo from '../assets/images/logo.png';

function getFontSize(length) {
  if (length > 55) {
    return `5rem`;
  }
  if (length > 32) {
    return `7rem`;
  }
  return `10rem`;
}

export default function ThumbNail({ location }) {
  if (!location.href) return null;
  const url = new URL(location.href);
  const thumbnail = url.searchParams.get('thumbnail');
  const link = url.searchParams.get('url');
  const linkURL = new URL(link);
  const title = url.searchParams.get('title');
  const H1 = styled(H)`
    font-size: ${getFontSize(title.length)};
    margin: 0;
    line-height: 1.3;
  `;
  const ThumbStyles = createGlobalStyle`
    html {
      position: relative;
    }
    body {
      position: relative;
      z-index: -2;
      display: grid;
      & > div, & > div > div {
        display: grid;
      }
    }

    .thumbnail {
      top: 2rem;
      right: 2rem;
      width: 350px;
      align-self: start;
    }
    .main {
      position: relative;
      display: grid;
      grid-auto-rows: 1fr auto;
      padding: 3rem;
    }
    .title {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
    }
    .lower {
      display: grid;
      grid-template-columns: auto 1fr auto;
      font-family: 'Operator mono';
      grid-gap: 10px 2rem;
      align-content: center;
      align-items: center;
      .handsome {
        border-radius: 50%;
        height: 120px;
      }
      .logo {
        height: 120px;
        align-self: end;
      }
      * {
        margin: 0;
        padding: 0;
        line-height: 1;
        font-size: 3rem;
      }
      .authorName {
        font-size: 4rem;
        font-style: italic;
        align-self: end;
      }
      .link {
        font-size: 3rem;
        align-self: start;
        .path {
          background: var(--yellow);
          font-style: italic;
        }
      }
    }

  `;
  return (
    <>
      <GlobalStyles />
      <ThumbStyles />
      <div className="main">
        <div className="title">
          <H1>{title}</H1>
          {thumbnail && <img className="thumbnail" src={thumbnail} alt={title} />}
        </div>
        <div className="lower">
          <img src="https://pbs.twimg.com/profile_images/877525007185858562/7G9vGTca_400x400.jpg" alt="Wes Bos" className="handsome" />
          <div>
            <p className="authorName">Wes Bos.com</p>
            <p className="link">
              {/* <span className="host">{linkURL.host}</span> */}
              <span className="path">{linkURL.pathname}</span>
            </p>
          </div>
          <img src={logo} alt="logo" className="logo" />
        </div>
      </div>
    </>
  );
}
