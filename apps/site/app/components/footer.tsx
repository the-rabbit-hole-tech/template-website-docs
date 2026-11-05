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
import { type FrameFooter, legalHtml } from "@product/frame/content";
import { product } from "@product/frame/product";

import { Mark } from "./mark";
import "./marketing.css";

// The one footer every page uses: the brand and tagline, the link groups,
// then the legal line. The docs footer mirrors it from the same packages/frame
// content and tokens.
export const Footer = ({ groups, marks, tagline }: FrameFooter) => (
  <footer className="footer">
    <div className="container">
      <div className="footer__grid">
        <div className="footer__brand">
          <a
            aria-label={product.name}
            className="footer__name"
            href={import.meta.env.BASE_URL}
          >
            <Mark className="footer__mark" size={24} />
            <span className="footer__wordmark">{product.name}</span>
          </a>
          <p className="footer__tagline">{tagline}</p>
        </div>
        {groups.map((group) => (
          <nav
            aria-label={group.title}
            className="footer__group"
            key={group.title}
          >
            <h2 className="footer__heading">{group.title}</h2>
            <ul className="footer__links">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p
        className="footer__legal"
        dangerouslySetInnerHTML={{
          __html: legalHtml(marks, new Date().getFullYear()),
        }}
      />
    </div>
  </footer>
);
