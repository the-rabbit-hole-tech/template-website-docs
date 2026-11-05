/*
MIT License

Copyright (c) 2026 Shane

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
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
