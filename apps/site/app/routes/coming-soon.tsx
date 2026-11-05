// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
