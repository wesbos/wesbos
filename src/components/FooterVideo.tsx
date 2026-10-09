import { FooterBlock, FooterHeading } from '@/styles/FooterStyles.module.css';

export default function FooterVideo() {
  return (
    <div className={FooterBlock}>
      <h3 className={FooterHeading}>
        <span className="highlight">Latest Video</span>
      </h3>
      <iframe
        style={{ width: '100%', aspectRatio: '16 / 9', border: 0 }}
        src="https://www.youtube.com/embed/ZLycoUMltNI"
        title="Hacking Cheap Smart Photo Frames into a Family Dashboard"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <p>Hacking Cheap Smart Photo Frames into a Family Dashboard</p>
      <a href="/hacking-smart-photo-frames">Read More →</a>
    </div>
  );
}
