import { FaInstagram } from 'react-icons/fa';
import { getInstagramPosts } from '@/functions/instagram';
import { getInstagramStories } from '@/functions/instagramStories';
import { FooterBlock, FooterHeading, InstaStyles } from '@/styles/FooterStyles.module.css';

function converIGtoJPG(base64data) {
  const jpegtpl = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsaGikdKUEmJkFCLy8vQkc/Pj4/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHSkpNCY0PygoP0c/NT9HR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//AABEIABQAKgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AA==';
  const t = atob(base64data);
  const p = t.slice(3).split('');
  const o = t
    .substring(0, 3)
    .split('')
    .map((e) => e.charCodeAt(0));
  const c = atob(jpegtpl).split('');
  c[162] = String.fromCharCode(o[1]);
  c[160] = String.fromCharCode(o[2]);
  return base64data ? `data:image/jpeg;base64,${btoa(c.concat(p).join(''))}` : null;
}

async function Stories() {
  const stories = await getInstagramStories();
  if (!stories.length) return;
  return (
    <>
      <h4>Stories</h4>
      <a className={StoriesStyles} href="https://www.instagram.com/stories/wesbos/">
        {stories.map((story) => (
          <img
            className="story"
            key={story.media_preview}
            src={`https://images.weserv.nl/?url=${encodeURIComponent(story.display_url)}&h=100`}
            alt="@wesbos Instagram Story"
            style={{
              backgroundImage: `url(${converIGtoJPG(story.media_preview)})`,
            }}
          />
        ))}
      </a>
    </>
  );
}

export default async function Instagram() {
  const [gramz, stories] = await Promise.all([getInstagramPosts()]);
  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">
          <a href="https://instagram.com/wesbos" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={{ strokeWidth: 15 }} />
            @wesbos{' '}
          </a>
          Instant Grams
        </span>
      </h3>
      <Stories />
      {gramz.length ? <h4>Posts</h4> : null}
      <div className={InstaStyles}>
        {Array.isArray(gramz) &&
          gramz.map((gram) => (
            <a href={gram.url} key={gram.id}>
              <img src={`https://images.weserv.nl/?url=${encodeURIComponent(gram.thumbnail)}&w=230`} alt={gram.caption} />
            </a>
          ))}
      </div>
    </div>
  );
}
