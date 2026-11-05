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
import type { MetaFunction } from "react-router";

import { legalLines } from "@product/frame/content";

import { comingSoon } from "~/content/coming-soon";
import { pageMeta } from "~/content/meta";
import "~/components/coming-soon.css";

export const meta: MetaFunction = () =>
  pageMeta({
    description: comingSoon.tagline,
    path: "/",
    title: "Coming soon",
  });

// The coming-soon page: the whole site of a coming-soon release
// (app/site-mode.ts). The mark, the name, the tagline and one line, then the
// legal line. No header, no strip, no links into the rest of the site.
const ComingSoon = () => {
  const base = import.meta.env.BASE_URL;
  const [marks, copyright] = legalLines(
    [comingSoon.name],
    new Date().getFullYear(),
  );
  return (
    <div className="soon">
      <main className="container soon__main">
        <img
          alt={comingSoon.mark.alt}
          className="soon__mark mark--light"
          height={96}
          src={`${base}${comingSoon.mark.light}`}
          width={96}
        />
        <img
          alt={comingSoon.mark.alt}
          className="soon__mark mark--dark"
          height={96}
          src={`${base}${comingSoon.mark.dark}`}
          width={96}
        />
        <h1 className="soon__name">{comingSoon.name}</h1>
        <p className="soon__tagline">{comingSoon.tagline}</p>
        <p className="soon__line">{comingSoon.line}</p>
      </main>
      <footer className="soon__footer">
        <p className="container soon__legal">
          {marks} {copyright}
        </p>
      </footer>
    </div>
  );
};

export default ComingSoon;
