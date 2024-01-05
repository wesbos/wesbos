import localFont from 'next/font/local';

export const radnika = localFont({
  src: './RadnikaNext/RadnikaNext-Black.woff2',
  variable: '--radnika',
});

export const operatorMono = localFont({
  src: [
    {
      path: './operator/OperatorMono-Book_Web.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './operator/OperatorMono-BookItalic_Web.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: './operator/OperatorMono-BoldItalic_Web.woff2',
      weight: '700',
      style: 'italic'
    },

    {
      path: './operator/OperatorMono-Bold_Web.woff2',
      weight: '700',
      style: 'normal'
    },
  ],
  variable: '--operator-mono',
});

