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
import type { ReactNode } from "react";

import { splitTrailingWord } from "~/lib/text";

import "./marketing.css";

interface SectionProperties {
  children?: ReactNode;
  eyebrow?: string;
  heading: string;
  icon?: string;
  id?: string;
  // "stack": head above body, full container width (a feature grid already
  // fills that width on its own). "split": head and body side by side, for
  // a section whose body is a single block of prose that would otherwise
  // sit in a narrow column with the rest of the container empty.
  layout?: "split" | "stack";
  lede?: string;
  // The page's first section carries its <h1>; the rest are <h2>.
  level?: 1 | 2;
  tone?: "card" | "default";
}

// A content section with an optional eyebrow and lede, a consistent width
// and vertical rhythm. `icon` is a single decorative character (an emoji escape
// from the content file, never a literal emoji in this source) shown after
// the heading's last word, wrapped aria-hidden so screen readers only read
// the heading itself, and kept in a `white-space: nowrap` unit with that
// word so the two can never land on separate lines.
export const Section = ({
  children,
  eyebrow,
  heading,
  icon,
  id,
  layout = "stack",
  lede,
  level = 2,
  tone = "default",
}: SectionProperties) => {
  const [headingLead, headingTail] = splitTrailingWord(heading);
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <section
      className={tone === "card" ? "section section--card" : "section"}
      id={id}
    >
      <div
        className={layout === "split" ? "container section__grid" : "container"}
      >
        <div className="section__head">
          {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
          <Heading
            className={
              level === 1
                ? "section__heading section__heading--page"
                : "section__heading"
            }
          >
            {headingLead}
            <span className="section__heading-icon">
              {headingTail}
              {icon ? <span aria-hidden="true"> {icon}</span> : null}
            </span>
          </Heading>
          {lede ? <p className="section__lede">{lede}</p> : null}
        </div>
        {children ? <div className="section__body">{children}</div> : null}
      </div>
    </section>
  );
};
