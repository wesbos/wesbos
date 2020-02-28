import styled, { createGlobalStyle } from 'styled-components';

import OperatorMonoXLightItalic_Web from '../assets/fonts/operator/OperatorMono-XLightItalic_Web.woff2';
import OperatorMonoXLight_Web from '../assets/fonts/operator/OperatorMono-XLight_Web.woff2';
import OperatorMonoMedium_Web from '../assets/fonts/operator/OperatorMono-Medium_Web.woff2';
import OperatorMonoMediumItalic_Web from '../assets/fonts/operator/OperatorMono-MediumItalic_Web.woff2';
import OperatorMonoLightItalic_Web from '../assets/fonts/operator/OperatorMono-LightItalic_Web.woff2';
import OperatorMonoLight_Web from '../assets/fonts/operator/OperatorMono-Light_Web.woff2';
import OperatorMonoBookItalic_Web from '../assets/fonts/operator/OperatorMono-BookItalic_Web.woff2';
import OperatorMonoBook_Web from '../assets/fonts/operator/OperatorMono-Book_Web.woff2';
import OperatorMonoBoldItalic_Web from '../assets/fonts/operator/OperatorMono-BoldItalic_Web.woff2';
import OperatorMonoBold_Web from '../assets/fonts/operator/OperatorMono-Bold_Web.woff2';
import OperatorSSmBlackPro_Web from '../assets/fonts/operator/OperatorSSm-Black-Pro_Web.woff2';
import OperatorSSmBlackItalicPro_Web from '../assets/fonts/operator/OperatorSSm-BlackItalic-Pro_Web.woff2';
import OperatorSSmBoldPro_Web from '../assets/fonts/operator/OperatorSSm-Bold-Pro_Web.woff2';
import OperatorSSmBoldItalicPro_Web from '../assets/fonts/operator/OperatorSSm-BoldItalic-Pro_Web.woff2';
import OperatorSSmBookPro_Web from '../assets/fonts/operator/OperatorSSm-Book-Pro_Web.woff2';
import OperatorSSmBookItalicPro_Web from '../assets/fonts/operator/OperatorSSm-BookItalic-Pro_Web.woff2';
import OperatorSSmLightPro_Web from '../assets/fonts/operator/OperatorSSm-Light-Pro_Web.woff2';
import OperatorSSmLightItalicPro_Web from '../assets/fonts/operator/OperatorSSm-LightItalic-Pro_Web.woff2';
import OperatorSSmMediumPro_Web from '../assets/fonts/operator/OperatorSSm-Medium-Pro_Web.woff2';
import OperatorSSmMediumItalicPro_Web from '../assets/fonts/operator/OperatorSSm-MediumItalic-Pro_Web.woff2';
import OperatorSSmXLightPro_Web from '../assets/fonts/operator/OperatorSSm-XLight-Pro_Web.woff2';
import OperatorSSmXLightItalicPro_Web from '../assets/fonts/operator/OperatorSSm-XLightItalic-Pro_Web.woff2';

const Fonts = createGlobalStyle`
  /* Operator Mono */
  /* TODO TRim weights I don't use */
  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoXLight_Web}) format('woff2');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoXLightItalic_Web}) format('woff2');
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoLight_Web}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoLightItalic_Web}) format('woff2');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBook_Web}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBookItalic_Web}) format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoMedium_Web}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoMediumItalic_Web}) format('woff2');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBold_Web}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator Mono';
    src: url(${OperatorMonoBoldItalic_Web}) format('woff2');
    font-weight: 700;
    font-style: italic;
  }

  /* Operator ScreenSmart */

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmXLightPro_Web}) format('woff2');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmXLightItalicPro_Web}) format('woff2');
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmLightPro_Web}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmLightItalicPro_Web}) format('woff2');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBookPro_Web}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBookItalicPro_Web}) format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmMediumPro_Web}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmMediumItalicPro_Web}) format('woff2');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBoldPro_Web}) format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBoldItalicPro_Web}) format('woff2');
    font-weight: 700;
    font-style: italic;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBlackPro_Web}) format('woff2');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'HCo Operator SSm';
    src: url(${OperatorSSmBlackItalicPro_Web}) format('woff2');
    font-weight: 800;
    font-style: italic;
  }
`;

export default Fonts;
