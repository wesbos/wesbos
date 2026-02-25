'use client';
import H from '@/components/mdxComponents/Headings';
import { LogoStyles, NavLi, NavLiSocial, NavLink, NavSmall, NavStyles, NavUl } from '@/styles/NavStyles.module.css';
import clsx from 'clsx';
import { FaBluesky, FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub, IoLogoLinkedin, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5';
import { Link } from 'waku';
import Logo from '../../public/images/logo.png';

function activeLink(href: string, path?: string) {
  if (!path) return null;
  if (path === href) {
    return 'current-parent';
  }
  if (path.startsWith(href) && href !== '/') {
    return 'current-parent';
  }
  return null;
}

function useHoverSound() {
  if (typeof window === 'undefined') {
    return {
      playSound: () => {}, // silly servers
    };
  }

  let audioContext: AudioContext | null = null;
  let audioBuffer: AudioBuffer | null = null;
  let isLoaded = false;

  // Initialize immediately when the hook is called
  const initAudio = async () => {
    if (isLoaded) return;

    try {
      // Create audio context with specific settings for iOS compatibility
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive',
      });

      // Load and decode the audio file
      const url = `/click.mp3`;
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      isLoaded = true;
    } catch (error) {
      console.info('Web Audio API initialization failed:', error);
    }
  };

  const playSound = async () => {
    if (!audioContext || !audioBuffer || !isLoaded) return;

    try {
      // Resume audio context if it's suspended (required for iOS)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Create a buffer source
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.value = 0.1; // Set volume

      // Connect: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Start playing from 0.006 seconds to match your original timing
      source.start(0, 0.006);
    } catch (error) {
      console.info('Failed to play sound:', error);
    }
  };

  // Initialize audio immediately
  initAudio();

  return {
    playSound,
  };
}

export default function Nav({ path }: { path: string }) {
  const logoWidth = 150;
  const ratio = 1.2195121951;
  const logoHeight = logoWidth / ratio;
  const { playSound } = useHoverSound();
  return (
    <nav className={NavStyles}>
      <div className={LogoStyles}>
        <Link to="/" style={{ height: logoHeight, width: logoWidth }} onPointerEnter={playSound}>
          <img height={logoHeight} width={logoWidth} src={Logo} alt="Wes Bos" />
        </Link>
      </div>
      <ul className={NavUl}>
        <li className={clsx([NavLi, activeLink('/courses', path)])}>
          <Link to="/courses" className={NavLink} onPointerEnter={playSound}>
            <H as="span">Courses</H>
            <span className={clsx([NavSmall, 'bottom'])}>free + premium</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/syntax', path)])}>
          <a href="https://syntax.fm" target="_blank" className={NavLink} rel="noreferrer">
            <H as="span">Syntax</H> <span className={clsx([NavSmall, 'bottom'])}>podcast</span>
          </a>
        </li>
        <li className={clsx([NavLi, activeLink('/about', path)])}>
          <Link to="/about" className={NavLink} onPointerEnter={playSound}>
            <H as="span">About</H>
            <span className={clsx([NavSmall, 'bottom'])}>me</span>
          </Link>
        </li>

        <li className={clsx([NavLi, activeLink('/blog', path)])}>
          <Link
            to="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */
            className={NavLink}
            onPointerEnter={playSound}
          >
            <H as="span">Blog</H>
            <span className={clsx([NavSmall, 'top'])}>it's good</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/tips', path)])}>
          <Link to="/tips" className={NavLink} onPointerEnter={playSound}>
            <H as="span">Tips</H>
            <span className={clsx([NavSmall, 'top'])}>🔥 Real Hot</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/javascript', path)])}>
          <Link to="/javascript" className={NavLink} onPointerEnter={playSound}>
            <H as="span">JavaScript</H>
            <span className={clsx([NavSmall, 'bottom'])}>Notes</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/speaking-and-training', path)])}>
          <Link to="/speaking-and-training" className={NavLink} onPointerEnter={playSound}>
            <H as="span">Speaking</H> <span className={clsx([NavSmall, 'bottom'])}>and training IRL</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/uses', path)])}>
          <Link to="/uses" className={NavLink} onPointerEnter={playSound}>
            <H as="span">/uses</H> <span className={clsx([NavSmall, 'bottom'])}>Font?! Theme!? </span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/contact', path)])}>
          <Link to="/contact" className={NavLink} onPointerEnter={playSound}>
            <H as="span">Contact</H>
            <span className={clsx([NavSmall, 'bottom'])}>me</span>
          </Link>
        </li>
        <li className={clsx([NavLi, NavLiSocial])}>
          {/* <ThemeToggle /> */}
          <a href="https://x.com/wesbos" title="Wes Bos on X" target="_blank" onPointerEnter={playSound}>
            <FaXTwitter />
          </a>

          <a
            href="https://bsky.app/profile/wesbos.com"
            title="Wes Bos on Bluesky"
            target="_blank"
            onPointerEnter={playSound}
          >
            <FaBluesky />
          </a>

          <a
            href="https://www.youtube.com/@WesBos"
            title="Wes Bos on YouTube"
            target="_blank"
            onPointerEnter={playSound}
          >
            <IoLogoYoutube />
          </a>
          <a
            href="https://www.instagram.com/wesbos"
            title="Wes Bos on Instagram"
            target="_blank"
            onPointerEnter={playSound}
          >
            <FaSquareInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/wesbos"
            title="Wes Bos on LinkedIn"
            target="_blank"
            onPointerEnter={playSound}
          >
            <IoLogoLinkedin />
          </a>
          <a href="https://www.tiktok.com/@wesbos" title="Wes Bos on TikTok" target="_blank" onPointerEnter={playSound}>
            <IoLogoTiktok />
          </a>

          <a href="https://github.com/wesbos" title="Wes Bos on GitHub" target="_blank" onPointerEnter={playSound}>
            <IoLogoGithub />
          </a>
        </li>
      </ul>
    </nav>
  );
}
