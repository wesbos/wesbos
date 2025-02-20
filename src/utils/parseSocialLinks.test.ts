import { expect, test } from 'vitest';
import { parseSocialLink } from './parseSocialLinks';

// Example links - the values are references to the test cases below
const links = [
  "https://x.com/wesbos/status/1834242925401694490",
  "https://twitter.com/wesbos/status/1834242925401694490",
  "https://www.instagram.com/wesbos/reel/C_0jGSKqVe0/",
  "https://www.instagram.com/p/DDckx3hR3xh",
  "https://www.tiktok.com/@wesbos/video/7413769211039730950",
  "https://www.youtube.com/shorts/JCoCRIiKXvI",
  "https://www.linkedin.com/posts/wesbos_are-you-using-position-absolute-to-overlap-activity-7240008841482903552-qT1V/",
  "https://www.linkedin.com/feed/update/urn:li:activity:7272663944106782720/",
  "https://www.threads.net/@wesbos/post/C_0i_3Eq28N?hl=en"
]

test('it parses twitter and x.com links', () => {
  const twitterOutput = {
    type: 'twitter',
    handle: 'wesbos',
    postId: '1834242925401694490',
  };
  expect(parseSocialLink(`https://x.com/wesbos/status/1834242925401694490`)).toMatchObject({ ...twitterOutput, url: 'https://x.com/wesbos/status/1834242925401694490' });
  expect(parseSocialLink(`https://twitter.com/wesbos/status/1834242925401694490`)).toMatchObject(twitterOutput);
  expect(parseSocialLink(`https://twitter.com/wesbos/status/1834242925401694490/`)).toMatchObject(twitterOutput);
  expect(parseSocialLink(`https://twitter.com/wesbos/status/1834242925401694490?`)).toMatchObject(twitterOutput);
  expect(parseSocialLink(`https://twitter.com/wesbos/status/1834242925401694490?ref_src=LOL`)).toMatchObject(twitterOutput);
});

test('it parses instagram links', () => {
  expect(parseSocialLink(`https://www.instagram.com/wesbos/reel/C_0jGSKqVe0/`)).toEqual({
    url: 'https://www.instagram.com/wesbos/reel/C_0jGSKqVe0/',
    type: 'instagram',
    handle: 'wesbos',
    postId: 'C_0jGSKqVe0',
    });
  expect(parseSocialLink(`https://www.instagram.com/p/DDckx3hR3xh`)).toMatchObject({
    handle: undefined,
    postId: 'DDckx3hR3xh',
    type: 'instagram',
  });
});

test('it parses tiktok links', () => {
  expect(parseSocialLink(`https://www.tiktok.com/@wesbos/video/7413769211039730950`)).toEqual({
    url: 'https://www.tiktok.com/@wesbos/video/7413769211039730950',
    type: 'tiktok',
    handle: 'wesbos',
    postId: '7413769211039730950',
  });
  expect(parseSocialLink(`https://www.tiktok.com/@wesbos/video/7444990056906919223?is_from_webapp=1&sender_device=pc&web_id=7365956764889007621`)).toMatchObject({
    type: 'tiktok',
    handle: 'wesbos',
    postId: '7444990056906919223',
  });
});

test('it parses youtube links', () => {
  expect(parseSocialLink(`https://www.youtube.com/shorts/JCoCRIiKXvI`)).toMatchObject({
    type: 'youtube',
    handle: undefined,
    postId: 'JCoCRIiKXvI',
  });
});

test('it parses linkedin links', () => {
  expect(parseSocialLink(`https://www.linkedin.com/posts/wesbos_are-you-using-position-absolute-to-overlap-activity-7240008841482903552-qT1V/`)).toMatchObject({
    type: 'linkedin',
    handle: undefined,
    postId: '7240008841482903552',
  });
  expect(parseSocialLink(`https://www.linkedin.com/feed/update/urn:li:activity:7272663944106782720/`)).toMatchObject({
    type: 'linkedin',
    handle: undefined,
    postId: '7272663944106782720',
  });
});

test('it parses threads links', () => {
  expect(parseSocialLink(`https://www.threads.net/@wesbos/post/C_0i_3Eq28N?hl=en`)).toMatchObject({
    type: 'threads',
    handle: 'wesbos',
    postId: 'C_0i_3Eq28N',
  });
});
