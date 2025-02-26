import { Link } from "waku";
import { Image } from "@/components/Image";
import clsx from "clsx";
import H from "@/components/mdxComponents/Headings";
import Logo from "../../public/images/logo.png";
import ThemeToggle from "./ThemeToggle";
import {
  LogoStyles,
  NavLi,
  NavLink,
  NavSmall,
  NavStyles,
  NavUl,
} from "@/styles/NavStyles.module.css";

function activeLink(path: string, href: string) {
  if (path === href) {
    return "current-parent";
  }
  if (href.includes(path)) {
    return "current-parent";
  }
  return null;
}

export default function Nav({ path }: { path: string }) {
  const logoWidth = 150;
  const ratio = 1.2195121951;
  const logoHeight = logoWidth / ratio;
  return (
    <nav className={NavStyles}>
      <div className={LogoStyles}>
        <Link to="/" style={{ height: logoHeight, width: logoWidth }}>
          <img
            height={logoHeight}
            width={logoWidth}
            src={Logo}
            alt="Wes Bos"
          />
        </Link>
      </div>
      <ul className={NavUl}>
        <li className={clsx([NavLi, activeLink("/courses", path)])}>
          <Link to="/courses" className={NavLink}>
            <H as="span">Courses</H>
            <span className={clsx([NavSmall, "bottom"])}>free + premium</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/syntax", path)])}>
          <a
            href="https://syntax.fm"
            target="_blank"
            className={NavLink}
            rel="noreferrer"
          >
            <H as="span">Syntax</H>{" "}
            <span className={clsx([NavSmall, "bottom"])}>podcast</span>
          </a>
        </li>
        <li className={clsx([NavLi, activeLink("/about", path)])}>
          <Link to="/about" className={NavLink}>
            <H as="span">About</H>
            <span className={clsx([NavSmall, "bottom"])}>me</span>
          </Link>
        </li>

        <li className={clsx([NavLi, activeLink("/blog", path)])}>
          <Link
            to="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */
            className={NavLink}
          >
            <H as="span">Blog</H>
            <span className={clsx([NavSmall, "top"])}>it's good</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/tips", path)])}>
          <Link to="/tips" className={NavLink}>
            <H as="span">Tips</H>
            <span className={clsx([NavSmall, "top"])}>🔥 Real Hot</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/javascript", path)])}>
          <Link to="/javascript" className={NavLink}>
            <H as="span">JavaScript</H>
            <span className={clsx([NavSmall, "bottom"])}>Notes</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/speaking-and-training", path)])}>
          <Link to="/speaking-and-training" className={NavLink}>
            <H as="span">Speaking</H>{" "}
            <span className={clsx([NavSmall, "bottom"])}>and training IRL</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/uses", path)])}>
          <Link to="/uses" className={NavLink}>
            <H as="span">/uses</H>{" "}
            <span className={clsx([NavSmall, "bottom"])}>Font?! Theme!? </span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/contact", path)])}>
          <Link to="/contact" className={NavLink}>
            <H as="span">Contact</H>
            <span className={clsx([NavSmall, "bottom"])}>me</span>
          </Link>
        </li>
        <li className={clsx([NavLi, activeLink("/contact", path)])}>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
