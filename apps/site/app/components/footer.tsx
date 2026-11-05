// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
