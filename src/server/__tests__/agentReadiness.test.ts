import { describe, expect, test } from 'vitest';
import { appendVary, buildSitemapXml, CANONICAL_ORIGIN, htmlToMarkdown } from '../agentReadiness';

describe('buildSitemapXml', () => {
  test('renders canonical urls and optional lastmod values', () => {
    const xml = buildSitemapXml([
      { path: '/' },
      { path: '/post', lastmod: '2026-04-18' },
    ]);

    expect(xml).toContain(`<loc>${CANONICAL_ORIGIN}/</loc>`);
    expect(xml).toContain(`<loc>${CANONICAL_ORIGIN}/post</loc>`);
    expect(xml).toContain('<lastmod>2026-04-18</lastmod>');
  });
});

describe('htmlToMarkdown', () => {
  test('creates markdown text from html title and body', () => {
    const markdown = htmlToMarkdown('<html><head><title>Hello</title></head><body><p>Hi <b>there</b>.</p></body></html>');
    expect(markdown).toContain('# Hello');
    expect(markdown).toContain('Hi there.');
  });
});

describe('appendVary', () => {
  test('adds new vary values once', () => {
    const headers = new Headers();
    appendVary(headers, 'Accept');
    appendVary(headers, 'Accept');
    appendVary(headers, 'Accept-Encoding');
    expect(headers.get('Vary')).toBe('Accept, Accept-Encoding');
  });
});
