import { FooterBlock, FooterHeading } from '@/styles/FooterStyles.module.css';

export default function FooterVideo() {
  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">Latest Video</span>
      </h3>
      <iframe
        style={{ width: '100%', aspectRatio: '16 / 9', border: 0 }}
        src="https://www.youtube.com/embed/JGQCcCzuS88"
        title="I Turned My Office into an Interactive 3D Model with AI"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <p>I Turned My Office into an Interactive 3D Model with AI</p>
      <a href="/3d-model-anything">Read More →</a>
    </div>
  );
}
