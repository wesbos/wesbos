import { Link } from "waku";
import { Image } from "@/components/Image";
import clsx from "clsx";
import H from "@/components/mdxComponents/Headings";
import useRowFinder from "@/utils/useRowFinder";
import Logo from "../../public/images/logo.png";
import {
  LogoStyles,
  NavLi,
  NavLink,
  NavSmall,
  NavStyles,
  NavUl,
} from "@/styles/NavStyles.module.css";

export default function Nav() {

  return (
    <nav className={NavStyles}>
      <div className={LogoStyles}>
        <Link to="/" style={{ height: "164px", width: "200px" }}>
          <Image
            height={164}
            width={200}
            src={Logo}
            alt="Wes Bos"
          />
        </Link>
      </div>
      <ul className={NavUl} >
        <li className={NavLi}>
          <Link to="/courses" className={NavLink}>
            <span className={clsx([NavSmall, "top"])}>free + premium</span>
            <H as="span">Courses</H>
            <span className={clsx([NavSmall, "bottom", "hideYoSelf"])}>x</span>
          </Link>
        </li>
        <li className={NavLi}>
          <a
            href="https://syntax.fm"
            target="_blank"
            className={NavLink}
            rel="noreferrer"
          >
            <span className={clsx([NavSmall, "top"])}>The Syntax</span>
            <H as="span">Podcast</H>{" "}
            <span className={clsx([NavSmall, "bottom"])}>Web Development</span>
          </a>
        </li>
        <li className={NavLi}>
          <Link to="/about" className={NavLink}>
            <span className={clsx([NavSmall, "top"])}>more</span>
            <H as="span">About</H>
            <span className={clsx([NavSmall, "bottom"])}>me</span>
          </Link>
        </li>

        <li className={NavLi}>
          <Link
            to="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */
           className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>the</span>
              <H as="span">Blog</H>
              <span className={clsx([NavSmall, "bottom", "hideYoSelf"])}>
                x
              </span>

          </Link>
        </li>
        <li className={NavLi}>
          <Link to="/tips" className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>🔥</span>
              <H as="span">Tips</H>
              <span className={clsx([NavSmall, "bottom"])}>real spicy</span>

          </Link>
        </li>
        <li className={NavLi}>
          <Link to="/javascript" className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>Beginner</span>
              <H as="span">JavaScript</H>
              <span className={clsx([NavSmall, "bottom"])}>Notes</span>

          </Link>
        </li>
        <li className={NavLi}>
          <Link to="/speaking-and-training" className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>real life</span>
              <H as="span">Speaking</H>{" "}
              <span className={clsx([NavSmall, "bottom"])}>and training</span>

          </Link>
        </li>
        <li className={NavLi}>
          <Link to="/uses" className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>what font?!</span>
              <H as="span">/uses</H>{" "}
              <span className={clsx([NavSmall, "bottom"])}>what theme!? </span>

          </Link>
        </li>
        <li className={NavLi}>
          <Link to="/contact" className={NavLink}>

              <span className={clsx([NavSmall, "top"])}>You want to</span>
              <H as="span">Contact</H>
              <span className={clsx([NavSmall, "bottom"])}>me</span>

          </Link>
        </li>
      </ul>
    </nav>
  );
}
