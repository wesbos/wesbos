'use client';
import H from '@/components/mdxComponents/Headings';
import { LogoStyles, NavLi, NavLiSocial, NavLink, NavSmall, NavStyles, NavUl } from '@/styles/NavStyles.module.css';
import clsx from 'clsx';
import { FaBluesky, FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub, IoLogoLinkedin, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5';
import { Link } from 'waku';
import Logo from '../../public/images/logo.png';

function activeLink(path: string, href: string) {
  if (path === href) {
    return 'current-parent';
  }
  if (href.includes(path)) {
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
  const url = `https://f000.backblazeb2.com/file/wes-dropshare/click/click.mp3`;
  const audio = new Audio(url);
  audio.volume = 0.1;
  return {
    playSound: () => {
      audio.currentTime = 0.006;
      audio.play().catch((err) => {
        console.info(
          `Man, you are missing out on some really cool sounds! If you Interact with the page, you can hear them.`,
        );
      });
    },
  };
}

function Pending({ isPending }: { isPending: boolean }) {
  // This is a hack as waku has not way to track when the router is pending.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('navigation-pending', { detail: { isPending } }));
  }
  return;
}

export default function Nav({ path }: { path: string }) {
  const logoWidth = 150;
  const ratio = 1.2195121951;
  const logoHeight = logoWidth / ratio;
  const { playSound } = useHoverSound();
  return (
    <nav className={NavStyles}>
      <div className={LogoStyles}>
        <Link
          to="/"
          style={{ height: logoHeight, width: logoWidth }}
          onPointerEnter={playSound}
          unstable_pending={<Pending isPending={true} />}
          unstable_notPending={<Pending isPending={false} />}
        >
          <img height={logoHeight} width={logoWidth} src={Logo} alt="Wes Bos" />
        </Link>
      </div>
      <ul className={NavUl}>
        <li className={clsx([NavLi, activeLink('/courses', path)])}>
          <Link
            to="/courses"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
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
          <Link
            to="/about"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">About</H>
            <span className={clsx([NavSmall, 'bottom'])}>me</span>
          </Link>
        </li>

        <li className={clsx([NavLi, activeLink('/blog', path)])}>
          <Link
            to="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">Blog</H>
            <span className={clsx([NavSmall, 'top'])}>it's good</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/tips', path)])}>
          <Link
            to="/tips"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">Tips</H>
            <span className={clsx([NavSmall, 'top'])}>🔥 Real Hot</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/javascript', path)])}>
          <Link
            to="/javascript"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">JavaScript</H>
            <span className={clsx([NavSmall, 'bottom'])}>Notes</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/speaking-and-training', path)])}>
          <Link
            to="/speaking-and-training"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">Speaking</H> <span className={clsx([NavSmall, 'bottom'])}>and training IRL</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/uses', path)])}>
          <Link
            to="/uses"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
            <H as="span">/uses</H> <span className={clsx([NavSmall, 'bottom'])}>Font?! Theme!? </span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink('/contact', path)])}>
          <Link
            to="/contact"
            className={NavLink}
            onPointerEnter={playSound}
            unstable_pending={<Pending isPending={true} />}
            unstable_notPending={<Pending isPending={false} />}
          >
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
