import React from 'react';

import OperatorMonoBookItalicWeb from '../assets/fonts/operator/OperatorMono-BookItalic_Web.woff2';
import OperatorMonoBookWeb from '../assets/fonts/operator/OperatorMono-Book_Web.woff2';
import OperatorMonoBoldItalicWeb from '../assets/fonts/operator/OperatorMono-BoldItalic_Web.woff2';
import OperatorMonoBoldWeb from '../assets/fonts/operator/OperatorMono-Bold_Web.woff2';

import radnika from '../assets/fonts/RadnikaNext/RadnikaNext-Black.woff2';

const fontCSS = /* css */ `
  @font-face {
    font-family: radnika;
    src: url(${radnika});
  }
  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBookWeb}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBookItalicWeb}) format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBoldWeb}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBoldItalicWeb}) format('woff2');
    font-weight: 700;
    font-style: italic;
  }
`;

export default function Fonts() {
  /* eslint-disable react/no-danger */
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: fontCSS,
      }}
    />
  );
  /* eslint-enable react/no-danger */
}
