import { createGlobalStyle } from 'styled-components';

import OperatorMonoBookItalicWeb from '../assets/fonts/operator/OperatorMono-BookItalic_Web.woff2';
import OperatorMonoBookWeb from '../assets/fonts/operator/OperatorMono-Book_Web.woff2';
import OperatorMonoBoldItalicWeb from '../assets/fonts/operator/OperatorMono-BoldItalic_Web.woff2';
import OperatorMonoBoldWeb from '../assets/fonts/operator/OperatorMono-Bold_Web.woff2';

const Fonts = createGlobalStyle`
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
export default Fonts;
