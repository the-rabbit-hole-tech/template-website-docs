// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
// Fails a coming-soon build that carries any of the full site: a route module
// other than the coming-soon page's, a page other than the index, or any of
// the landing page's copy. `npm run build:coming-soon` runs this on the
// output, so a leak fails the build itself.
//
//   node --experimental-strip-types scripts/check-release-build.ts build/client
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { comingSoon } from "../app/content/coming-soon.ts";
import * as landing from "../app/content/home.ts";

// The full site's route modules, as React Router names their chunks.
const FULL_SITE_ROUTE = /(^|\/)(home|releases)-[\w-]+\.js$/;

// Where the index lands: the build root, or under the base path when
// PREVIEW_BASE_PATH sets one (React Router writes prerendered pages there).
export const indexPage = (basePath?: string): string => {
  const base = (basePath ?? "").replaceAll(/^\/+|\/+$/g, "");
  return base ? `${base}/index.html` : "index.html";
};

export const landingLeaks = (
  files: Record<string, string>,
  landingCopy: string[],
  index = "index.html",
): string[] => {
  // The index, and the fallback page a static build always has.
  const allowedPages = new Set(["__spa-fallback.html", index]);
  const leaks: string[] = [];
  for (const [name, text] of Object.entries(files)) {
    if (FULL_SITE_ROUTE.test(name))
      leaks.push(`${name} is a full-site route module`);
    if (name.endsWith(".html") && !allowedPages.has(name)) {
      leaks.push(`${name} is a page other than the index`);
    }
    for (const copy of landingCopy) {
      if (text.includes(copy)) leaks.push(`${name} contains "${copy}"`);
    }
  }
  return leaks;
};

const strings = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((item) => strings(item));
  if (value && typeof value === "object")
    return Object.values(value).flatMap((item) => strings(item));
  return [];
};

// The landing page's own words: every string in its content long enough to be
// telling, leaving out any the coming-soon page also uses.
export const landingCopy = (): string[] => {
  const shared = new Set(strings(comingSoon));
  return [...new Set(strings(landing))].filter(
    (text) => text.length >= 12 && !shared.has(text),
  );
};

const readAll = (directory: string, root = directory): Record<string, string> =>
  Object.fromEntries(
    readdirSync(directory).flatMap((name) => {
      const full = path.join(directory, name);
      if (statSync(full).isDirectory())
        return Object.entries(readAll(full, root));
      return [[path.relative(root, full), readFileSync(full, "latin1")]];
    }),
  );

if (import.meta.url === `file://${process.argv[1]}`) {
  const directory = process.argv[2];
  if (!directory)
    throw new Error("usage: check-release-build.ts <build/client>");
  const files = readAll(directory);
  const copy = landingCopy();
  const leaks = landingLeaks(
    files,
    copy,
    indexPage(process.env.PREVIEW_BASE_PATH),
  );
  console.log(
    `checked ${Object.keys(files).length} file(s) in ${directory} against ${copy.length} landing strings`,
  );
  if (leaks.length > 0) {
    console.error(
      `coming-soon build check failed: the full site leaked into it\n${leaks.join("\n")}`,
    );
    process.exit(1);
  }
  console.log("coming-soon build check passed: the coming-soon page only");
}
