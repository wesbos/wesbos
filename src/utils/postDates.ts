const SITE_TIME_ZONE = 'America/Toronto';

const WALL_CLOCK_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/;

const zoneParts = new Intl.DateTimeFormat('en-US', {
  timeZone: SITE_TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

const displayDate = new Intl.DateTimeFormat('en-US', {
  timeZone: SITE_TIME_ZONE,
  dateStyle: 'long',
});

/** How far ahead of UTC the site's time zone is at a given moment, in ms. Negative for Eastern. */
function zoneOffset(utcMs: number) {
  const parts = zoneParts.formatToParts(utcMs);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  const wallClockAsUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return wallClockAsUtc - Math.floor(utcMs / 1000) * 1000;
}

/**
 * Most post dates are written with no time zone (2026-10-22T09:00:00), which `new Date()` reads in
 * whatever zone the code runs in: Eastern on a laptop, UTC on Cloudflare. They were written in
 * Eastern, so pin them to that. Dates that already say their zone are returned untouched.
 */
export function normalizePostDate(date: string) {
  if (typeof date !== 'string' || !WALL_CLOCK_DATE.test(date)) return date;
  const wallClock = Date.parse(`${date}Z`);
  // The offset depends on the moment we're solving for (DST), so refine the first guess once
  const firstGuess = wallClock - zoneOffset(wallClock);
  return new Date(wallClock - zoneOffset(firstGuess)).toISOString();
}

/** Formats a post date as "October 22, 2026" in the site's time zone, wherever the code runs. */
export function formatPostDate(date: string | Date) {
  return displayDate.format(new Date(date));
}
