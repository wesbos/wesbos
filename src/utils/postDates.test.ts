import { describe, expect, test } from 'vitest';
import { formatPostDate, normalizePostDate } from './postDates';

describe('normalizePostDate', () => {
  test('reads dates with no time zone as Eastern, including DST', () => {
    expect(normalizePostDate('2026-10-22T09:00:00')).toBe('2026-10-22T13:00:00.000Z'); // EDT
    expect(normalizePostDate('2026-01-15T09:00:00')).toBe('2026-01-15T14:00:00.000Z'); // EST
  });

  test('handles the hours around DST changes', () => {
    expect(normalizePostDate('2026-03-08T01:59:00')).toBe('2026-03-08T06:59:00.000Z');
    expect(normalizePostDate('2026-03-08T03:00:00')).toBe('2026-03-08T07:00:00.000Z');
    expect(normalizePostDate('2026-11-01T00:30:00')).toBe('2026-11-01T04:30:00.000Z');
    expect(normalizePostDate('2026-11-01T02:30:00')).toBe('2026-11-01T07:30:00.000Z');
  });

  test('leaves dates that already have a zone alone', () => {
    expect(normalizePostDate('2024-04-03T16:17:47.000Z')).toBe('2024-04-03T16:17:47.000Z');
    expect(normalizePostDate('2026-10-22T09:00:00-04:00')).toBe('2026-10-22T09:00:00-04:00');
    expect(normalizePostDate('Thu Dec 12 18:51:27 +0000 2024')).toBe('Thu Dec 12 18:51:27 +0000 2024');
  });

  test('is safe to run twice, since posts are re-parsed on every call', () => {
    const once = normalizePostDate('2026-10-22T09:00:00');
    expect(normalizePostDate(once)).toBe(once);
  });
});

describe('formatPostDate', () => {
  test('a late evening post stays on the day it was published', () => {
    expect(formatPostDate(normalizePostDate('2026-10-22T23:30:00'))).toBe('October 22, 2026');
  });

  test('uses the Eastern day for UTC dates', () => {
    expect(formatPostDate('2026-10-23T02:00:00.000Z')).toBe('October 22, 2026');
  });
});
