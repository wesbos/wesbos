import { createGlobalStyle } from 'styled-components';

import OperatorMonoBookItalic_Web from '../assets/fonts/operator/OperatorMono-BookItalic_Web.woff2';
import OperatorMonoBook_Web from '../assets/fonts/operator/OperatorMono-Book_Web.woff2';
import OperatorMonoBoldItalic_Web from '../assets/fonts/operator/OperatorMono-BoldItalic_Web.woff2';
import OperatorMonoBold_Web from '../assets/fonts/operator/OperatorMono-Bold_Web.woff2';

const Fonts = createGlobalStyle`
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
`;
export default Fonts;
