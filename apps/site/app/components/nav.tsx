// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import { HeaderMenu } from "@product/frame/header-menu";
import { NAV_LINK_CLASS } from "@product/frame/header-menu-config";
import { product } from "@product/frame/product";

import { Mark } from "./mark";
import { ThemeSwitch } from "./theme-switch";
import "./marketing.css";

interface NavLink {
  href: string;
  label: string;
}

// The slim top nav. The docs header mirrors it from the same packages/frame
// tokens: the mark and the product name, the links, then the theme switch at
// the right end. Under the frame's breakpoint the links fold into the shared
// menu button after the switch.
export const Nav = ({ links }: { links: NavLink[] }) => (
  <header className="nav">
    <div className="container nav__row">
      <a
        aria-label={product.name}
        className="nav__brand"
        href={import.meta.env.BASE_URL}
      >
        <Mark className="nav__logo" size={28} />
        <span className="nav__title">{product.name}</span>
      </a>
      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((link) => (
            <li className={NAV_LINK_CLASS} key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li className="nav__theme">
            <ThemeSwitch />
          </li>
          <HeaderMenu as="li" links={links} />
        </ul>
      </nav>
    </div>
  </header>
);
