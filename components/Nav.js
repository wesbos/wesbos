'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var link_1 = require("next/link");
var image_1 = require("next/image");
var clsx_1 = require("clsx");
var Headings_1 = require("@/components/mdxComponents/Headings");
var useRowFinder_1 = require("@/utils/useRowFinder");
var NavStyles_module_css_1 = require("@/styles/NavStyles.module.css");
function Nav() {
    var _a = (0, useRowFinder_1.default)(), ref = _a.ref, getRow = _a.getRow;
    return (<nav className={NavStyles_module_css_1.NavStyles}>
      <div className={NavStyles_module_css_1.LogoStyles}>
        <link_1.default href="/">
          <image_1.default height={164} width={200} priority src="/images/logo.png" alt="Wes Bos"/>
        </link_1.default>
      </div>
      <ul className={NavStyles_module_css_1.NavUl} ref={ref}>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(0) > 1 ? 'row2' : ''}>
          <link_1.default href="/courses" passHref legacyBehavior>
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>free + premium</span>
              <Headings_1.default as="span">Courses</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>x</span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(1) > 1 ? 'row2' : ''}>
          <a href="https://syntax.fm" target="_blank" className={NavStyles_module_css_1.NavLink} rel="noreferrer">
            <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>The Syntax</span>
            <Headings_1.default as="span">Podcast</Headings_1.default> <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>Web Development</span>
          </a>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(2) > 1 ? 'row2' : ''}>
          <link_1.default href="/about" passHref legacyBehavior>
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>more</span>
              <Headings_1.default as="span">About</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>me</span>
            </a>
          </link_1.default>
        </li>

        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(3) > 1 ? 'row2' : ''}>
          <link_1.default href="/blog" /* TODO className={pageContext.collection === 'post' && !pageContext.slug.includes('uses') ? 'current-parent' : null} */ passHref legacyBehavior>
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>the</span>
              <Headings_1.default as="span">Blog</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>x</span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(4) > 1 ? 'row2' : ''}>
          <link_1.default passHref legacyBehavior href="/tips" /* className={pageContext.collection === 'tip' ? 'current-parent' : null} */>
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>🔥</span>
              <Headings_1.default as="span">Tips</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>real spicy</span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(5) > 1 ? 'row2' : ''}>
          <link_1.default passHref legacyBehavior href="/javascript" /* className={pageContext.collection === 'javascript' ? 'current-parent' : null} */>
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>Beginner</span>
              <Headings_1.default as="span">JavaScript</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>Notes</span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(6) > 1 ? 'row2' : ''}>
          <link_1.default passHref legacyBehavior href="/speaking-and-training">
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>real life</span>
              <Headings_1.default as="span">Speaking</Headings_1.default> <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>and training</span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(7) > 1 ? 'row2' : ''}>
          <link_1.default passHref legacyBehavior href="/uses">
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>what font?!</span>
              <Headings_1.default as="span">/uses</Headings_1.default> <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>what theme!? </span>
            </a>
          </link_1.default>
        </li>
        <li className={NavStyles_module_css_1.NavLi} data-row={getRow(8) > 1 ? 'row2' : ''}>
          <link_1.default passHref legacyBehavior href="/contact">
            <a className={NavStyles_module_css_1.NavLink}>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'top'])}>You want to</span>
              <Headings_1.default as="span">Contact</Headings_1.default>
              <span className={(0, clsx_1.default)([NavStyles_module_css_1.NavSmall, 'bottom'])}>me</span>
            </a>
          </link_1.default>
        </li>
      </ul>
    </nav>);
}
exports.default = Nav;
