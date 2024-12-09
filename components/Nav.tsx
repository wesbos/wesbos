'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import H from '@/components/mdxComponents/Headings';
import useRowFinder from '@/utils/useRowFinder';
import { LogoStyles, NavLi, NavLink, NavSmall, NavStyles, NavUl } from '@/styles/NavStyles.module.css';

export default function Nav() {
  const { ref, getRow } = useRowFinder();
  return (
    <nav className={NavStyles}>
      <div className={LogoStyles}>
        <Link href="/">
          <Image height={164} width={200} priority src="/images/logo.png" alt="Wes Bos" />
        </Link>
      </div>
      <ul className={NavUl} ref={ref}>
        <li className={NavLi} data-row={getRow(0) > 1 ? 'row2' : ''}>
          <Link href="/courses" passHref legacyBehavior>
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>free + premium</span>
              <H as="span">Courses</H>
              <span className={clsx([NavSmall, 'bottom'])}>x</span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(1) > 1 ? 'row2' : ''}>
          <a href="https://syntax.fm" target="_blank" className={NavLink} rel="noreferrer">
            <span className={clsx([NavSmall, 'top'])}>The Syntax</span>
            <H as="span">Podcast</H> <span className={clsx([NavSmall, 'bottom'])}>Web Development</span>
          </a>
        </li>
        <li className={NavLi} data-row={getRow(2) > 1 ? 'row2' : ''}>
          <Link href="/about" passHref legacyBehavior>
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>more</span>
              <H as="span">About</H>
              <span className={clsx([NavSmall, 'bottom'])}>me</span>
            </a>
          </Link>
        </li>

        <li className={NavLi} data-row={getRow(3) > 1 ? 'row2' : ''}>
          <Link href="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */ passHref legacyBehavior>
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>the</span>
              <H as="span">Blog</H>
              <span className={clsx([NavSmall, 'bottom'])}>x</span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(4) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/tips" /* className={pageContext.collection === 'tip' ? 'current-parent' : null} */>
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>🔥</span>
              <H as="span">Tips</H>
              <span className={clsx([NavSmall, 'bottom'])}>real spicy</span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(5) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/javascript" /* className={pageContext.collection === 'javascript' ? 'current-parent' : null} */>
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>Beginner</span>
              <H as="span">JavaScript</H>
              <span className={clsx([NavSmall, 'bottom'])}>Notes</span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(6) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/speaking-and-training">
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>real life</span>
              <H as="span">Speaking</H> <span className={clsx([NavSmall, 'bottom'])}>and training</span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(7) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/uses">
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>what font?!</span>
              <H as="span">/uses</H> <span className={clsx([NavSmall, 'bottom'])}>what theme!? </span>
            </a>
          </Link>
        </li>
        <li className={NavLi} data-row={getRow(8) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/contact">
            <a className={NavLink}>
              <span className={clsx([NavSmall, 'top'])}>You want to</span>
              <H as="span">Contact</H>
              <span className={clsx([NavSmall, 'bottom'])}>me</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
