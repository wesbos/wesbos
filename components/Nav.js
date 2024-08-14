'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import H from '@/components/mdxComponents/Headings';
import useRowFinder from '@/utils/useRowFinder';
import { NavLi, NavLink, NavSmall, NavStyles, NavUl } from './styles/NavStyles';

export default function Nav() {
  const { ref, getRow } = useRowFinder();
  return (
    <NavStyles>
      <h1>
        <Link href="/">
          <Image height={164} width={200} priority src="/images/logo.png" alt="Wes Bos" />
        </Link>
      </h1>
      <NavUl ref={ref}>
          <NavLi className={getRow(0) > 1 ? 'row2' : ''}>
            <Link href="/courses" passHref legacyBehavior>
              <NavLink>
                <NavSmall className="top">free + premium</NavSmall>
                <H as="span">Courses</H>
                <NavSmall className="bottom hideYoSelf">x</NavSmall>
              </NavLink>
            </Link>
          </NavLi>
        <NavLi className={getRow(1) > 1 ? 'row2' : ''}>
          <NavLink href="https://syntax.fm" target="_blank" rel="noreferrer noopener">
            <NavSmall className="top">The Syntax</NavSmall>
            <H as="span">Podcast</H> <NavSmall className="bottom">Web Development</NavSmall>
          </NavLink>
        </NavLi>
        <NavLi className={getRow(2) > 1 ? 'row2' : ''}>
          <Link href="/about" passHref legacyBehavior>
            <NavLink>
              <NavSmall className="top">more</NavSmall>
              <H as="span">About</H>
              <NavSmall className="bottom">me</NavSmall>
            </NavLink>
          </Link>
        </NavLi>

        <NavLi className={getRow(3) > 1 ? 'row2' : ''}>
          <Link href="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */ passHref legacyBehavior>
            <NavLink>
              <NavSmall className="top">the</NavSmall>
              <H as="span">Blog</H>
              <NavSmall className="bottom hideYoSelf">x</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
        <NavLi className={getRow(4) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/tips" /* className={pageContext.collection === 'tip' ? 'current-parent' : null} */>
            <NavLink>
              <NavSmall className="top">🔥</NavSmall>
              <H as="span">Tips</H>
              <NavSmall className="bottom">real spicy</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
        <NavLi className={getRow(5) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/javascript" /* className={pageContext.collection === 'javascript' ? 'current-parent' : null} */>
            <NavLink>
              <NavSmall className="top">Beginner</NavSmall>
              <H as="span">JavaScript</H>
              <NavSmall className="bottom">Notes</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
        <NavLi className={getRow(6) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/speaking-and-training">
            <NavLink>
              <NavSmall className="top">real life</NavSmall>
              <H as="span">Speaking</H> <NavSmall className="bottom">and training</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
        <NavLi className={getRow(7) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/uses">
            <NavLink>
              <NavSmall className="top">what font?!</NavSmall>
              <H as="span">/uses</H> <NavSmall className="bottom">what theme!?</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
        <NavLi className={getRow(8) > 1 ? 'row2' : ''}>
          <Link passHref legacyBehavior href="/contact">
            <NavLink>
              <NavSmall className="top">You want to</NavSmall>
              <H as="span">Contact</H>
              <NavSmall className="bottom">me</NavSmall>
            </NavLink>
          </Link>
        </NavLi>
      </NavUl>
    </NavStyles>
  );
}
