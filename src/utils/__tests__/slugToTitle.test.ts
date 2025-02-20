import { describe, expect, test } from 'vitest';
import { slugToTitle } from '../slugToTitle';

describe('slugToTitle', () => {
  test('converts basic slug to title case', () => {
    expect(slugToTitle('about')).toBe('About');
    expect(slugToTitle('about-me')).toBe('About Me');
  });

  test('handles leading and trailing slashes', () => {
    expect(slugToTitle('/about')).toBe('About');
    expect(slugToTitle('about/')).toBe('About');
    expect(slugToTitle('/about/')).toBe('About');
    expect(slugToTitle('//about//')).toBe('About');
  });

  test('handles tip prefix correctly', () => {
    expect(slugToTitle('tip/generate-metadata-from-me')).toBe('Tip: Generate Metadata From Me');
    expect(slugToTitle('/tip/my-cool-tip')).toBe('Tip: My Cool Tip');
  });

  test('handles empty strings and edge cases', () => {
    expect(slugToTitle('')).toBe('');
    expect(slugToTitle('/')).toBe('');
    expect(slugToTitle('//')).toBe('');
  });

  test('preserves casing within words', () => {
    expect(slugToTitle('generate-metadata-from-ME')).toBe('Generate Metadata From ME');
    expect(slugToTitle('using-GraphQL-api')).toBe('Using GraphQL Api');
  });
});
