import { getHighlighter } from 'shiki';

const myTheme = {
  name: 'my-theme',
  settings: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#888',
      },
    },
    // ...
  ],
};

const highlighter = await getHighlighter({
  themes: [myTheme],
});

const code = `console.log('hello')`;
const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'my-theme',
});
