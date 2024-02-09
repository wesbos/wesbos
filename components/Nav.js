'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import H from '@/components/mdxComponents/Headings';
import useRowFinder from '@/utils/useRowFinder';
import { NavLi, NavStyles, NavUl } from './styles/NavStyles';

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
          <Link href="/courses">
            <small className="top">free + premium</small>
            <H as="span">Courses</H>
            <small className="bottom hideYoSelf">x</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(1) > 1 ? 'row2' : ''}>
          <a href="https://syntax.fm" target="_blank" rel="noreferrer noopener">
            <small className="top">The Syntax</small>
            <H as="span">Podcast</H> <small className="bottom">Web Development</small>
          </a>
        </NavLi>
        <NavLi className={getRow(2) > 1 ? 'row2' : ''}>
          <Link href="/about">
            <small className="top">more</small>
            <H as="span">About</H>
            <small className="bottom">me</small>
          </Link>
        </NavLi>

        <NavLi className={getRow(3) > 1 ? 'row2' : ''}>
          <Link href="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */>
            <small className="top">the</small>
            <H as="span">Blog</H>
            <small className="bottom hideYoSelf">x</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(4) > 1 ? 'row2' : ''}>
          <Link href="/tips" /* className={pageContext.collection === 'tip' ? 'current-parent' : null} */>
            <small className="top">🔥</small>
            <H as="span">Tips</H>
            <small className="bottom">real spicy</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(5) > 1 ? 'row2' : ''}>
          <Link href="/javascript" /* className={pageContext.collection === 'javascript' ? 'current-parent' : null} */>
            <small className="top">Beginner</small>
            <H as="span">JavaScript</H>
            <small className="bottom">Notes</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(6) > 1 ? 'row2' : ''}>
          <Link href="/speaking-and-training">
            <small className="top">real life</small>
            <H as="span">Speaking</H> <small className="bottom">and training</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(7) > 1 ? 'row2' : ''}>
          <Link href="/uses">
            <small className="top">what font?!</small>
            <H as="span">/uses</H> <small className="bottom">what theme!?</small>
          </Link>
        </NavLi>
        <NavLi className={getRow(8) > 1 ? 'row2' : ''}>
          <Link href="/contact">
            <small className="top">You want to</small>
            <H as="span">Contact</H>
            <small className="bottom">me</small>
          </Link>
        </NavLi>
      </NavUl>
    </NavStyles>
  );
}
