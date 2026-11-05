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
// Checks that every internal (same-site) href/src in the prerendered HTML
// output resolves to a real file, and every #fragment to an id on its page.
// External links (http/https) are only counted, not fetched -- a network
// check in CI would be flaky and slow for no real safety gain on a handful of
// GitHub links.
//
// Usage: node scripts/check-links.mjs <built-site-directory>

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ATTR_RE = /\b(?:href|src)="([^"]+)"/g;

const findHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
};

const ID_RE = /\bid="([^"]+)"/g;
const idCache = new Map();

const idsIn = async (file) => {
  if (!idCache.has(file)) {
    const content = await readFile(file, "utf8");
    idCache.set(file, new Set([...content.matchAll(ID_RE)].map((m) => m[1])));
  }
  return idCache.get(file);
};

const main = async () => {
  const root = process.argv[2];
  if (!root) {
    console.error("usage: node scripts/check-links.mjs <built-site-directory>");
    process.exit(2);
  }

  const htmlFiles = await findHtmlFiles(root);
  if (htmlFiles.length === 0) {
    console.error(`no .html files found under ${root}`);
    process.exit(2);
  }

  let externalCount = 0;
  const broken = [];

  for (const file of htmlFiles) {
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(ATTR_RE)) {
      const link = match[1];
      if (/^(https?:|mailto:|tel:)/.test(link)) {
        externalCount += 1;
        continue;
      }
      if (link.startsWith("javascript:") || link.startsWith("data:")) continue;
      // Relative asset links are resolved by the bundler already; same-page
      // fragments are checked against this page's ids.
      if (!link.startsWith("/") && !link.startsWith("#")) continue;
      if (link === "#") continue;

      const ok = await resolves(root, file, link);
      if (!ok) broken.push({ file: path.relative(root, file), link });
    }
  }

  console.log(
    `checked ${htmlFiles.length} HTML file(s), ${externalCount} external link(s) (not fetched)`,
  );

  if (broken.length > 0) {
    console.error(`${broken.length} broken internal link(s):`);
    for (const { file, link } of broken) {
      console.error(`  ${file} -> ${link}`);
    }
    process.exit(1);
  }

  console.log("no broken internal links");
};

// A link resolves when its file exists and, for a "#fragment" on an HTML
// page, when that page has an element with that id.
const resolves = async (root, fromFile, link) => {
  const [withoutHash, fragment = ""] = link.split("#");
  const clean = withoutHash.split("?", 1)[0];
  const file = clean === "" ? fromFile : await targetFile(root, clean);
  if (!file) return false;
  if (!fragment || !file.endsWith(".html")) return true;
  const ids = await idsIn(file);
  return ids.has(decodeURIComponent(fragment));
};

// The HTML file a path serves, or null when nothing is there.
const targetFile = async (root, clean) => {
  const relative = clean.startsWith("/") ? clean.slice(1) : clean;
  const candidate = path.join(root, relative);
  try {
    const st = await stat(candidate);
    if (!st.isDirectory()) return candidate;
    const index = path.join(candidate, "index.html");
    await stat(index);
    return index;
  } catch {
    return null;
  }
};

await main();
