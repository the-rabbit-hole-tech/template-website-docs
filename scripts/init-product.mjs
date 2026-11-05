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
// Fills the template's placeholders with a product's own values, in place:
// every {{PRODUCT}}, {{SLUG}}, {{DOMAIN}}, {{DOCS_DOMAIN}}, {{GITHUB_ORG}},
// {{TAGLINE}} and {{COPYRIGHT_HOLDER}} in the tree (TEMPLATE.md lists where
// each one lands). Run it once, in a new product's clone of the template,
// then commit what it changed.
//
//   node scripts/init-product.mjs --product=<name> --slug=<slug> \
//     --domain=<site host> --docs-domain=<docs host> --github-org=<org> \
//     --tagline=<line> --copyright-holder=<holder> [--root=<directory>] [--dry-run]
//
//   node scripts/init-product.mjs --fixture [--root=<directory>] [--dry-run]
//
// --fixture fills in a fictional product, Acme, on example.com addresses. CI
// runs it before the checks, so the template is proven the way a product
// would use it. Nothing is written unless every value is valid.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

export const PLACEHOLDERS = [
  "PRODUCT",
  "SLUG",
  "DOMAIN",
  "DOCS_DOMAIN",
  "GITHUB_ORG",
  "TAGLINE",
  "COPYRIGHT_HOLDER",
];

export const FIXTURE = {
  COPYRIGHT_HOLDER: "Acme Example",
  DOCS_DOMAIN: "docs.acme.example.com",
  DOMAIN: "www.acme.example.com",
  GITHUB_ORG: "acme-example",
  PRODUCT: "Acme",
  SLUG: "acme",
  TAGLINE: "A fictional product that proves the template",
};

const FLAGS = {
  COPYRIGHT_HOLDER: "copyright-holder",
  DOCS_DOMAIN: "docs-domain",
  DOMAIN: "domain",
  GITHUB_ORG: "github-org",
  PRODUCT: "product",
  SLUG: "slug",
  TAGLINE: "tagline",
};

const HOST =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

// Values land in TypeScript and JSON strings, YAML front matter, Markdown and
// HTML, so none may carry a character that would end or escape one of those.
const UNSAFE = /["\\`<>{}$\n\r]/;

const RULES = {
  COPYRIGHT_HOLDER: () => null,
  DOCS_DOMAIN: (v) =>
    HOST.test(v)
      ? null
      : "must be a lowercase host name, with no scheme or path",
  DOMAIN: (v) =>
    HOST.test(v)
      ? null
      : "must be a lowercase host name, with no scheme or path",
  GITHUB_ORG: (v) =>
    /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(v)
      ? null
      : "must be a GitHub user or organisation name",
  PRODUCT: (v) =>
    /[:#]/.test(v)
      ? "may not contain ':' or '#' (it sits in YAML front matter)"
      : null,
  SLUG: (v) =>
    /^[a-z][a-z0-9-]{0,40}[a-z0-9]$/.test(v)
      ? null
      : "must be lowercase letters, digits and hyphens, starting with a letter",
  TAGLINE: () => null,
};

export const validate = (values) => {
  const problems = [];
  for (const key of PLACEHOLDERS) {
    const value = values[key];
    if (typeof value !== "string" || value.trim() === "") {
      problems.push(`${key} is missing (--${FLAGS[key]})`);
      continue;
    }
    if (value !== value.trim()) problems.push(`${key} has spaces at its ends`);
    else if (UNSAFE.test(value))
      problems.push(
        `${key} may not contain quotes, backslashes, <, >, {, }, $ or a line break`,
      );
    else {
      const problem = RULES[key](value);
      if (problem) problems.push(`${key} ${problem} (got "${value}")`);
    }
  }
  return problems;
};

const PATTERN = new RegExp(`\\{\\{(${PLACEHOLDERS.join("|")})\\}\\}`, "g");

export const fill = (text, values) =>
  text.replaceAll(PATTERN, (_, key) => values[key]);

export const placeholdersIn = (text) => [
  ...new Set([...text.matchAll(PATTERN)].map((m) => m[1])),
];

// Folders that are never the template's own source.
const SKIP_DIRS = new Set([
  ".cache",
  ".docusaurus",
  ".git",
  ".react-router",
  "build",
  "build-sub-path",
  "coverage",
  "dist",
  "node_modules",
]);

// The guide that documents the placeholders, this script and its test name
// them on purpose; the lockfile never holds them.
const SKIP_FILES = new Set([
  "package-lock.json",
  "scripts/init-product.mjs",
  "scripts/init-product.test.mjs",
  "TEMPLATE.md",
]);

const BINARY = /\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|pdf|zip|gz)$/i;

export const filesToFill = (root) => {
  const found = [];
  const walk = (directory) => {
    for (const name of readdirSync(directory)) {
      const full = path.join(directory, name);
      const relativePath = path.relative(root, full).split(path.sep).join("/");
      if (statSync(full).isDirectory()) {
        if (!SKIP_DIRS.has(name)) walk(full);
      } else if (!SKIP_FILES.has(relativePath) && !BINARY.test(name)) {
        found.push(relativePath);
      }
    }
  };
  walk(root);
  return found;
};

// Fills every placeholder under root. Returns the files it changed (or would
// change, on a dry run) and any file that still holds a placeholder after.
export const initProduct = (root, values, { dryRun = false } = {}) => {
  const problems = validate(values);
  if (problems.length > 0)
    throw new Error(`can't fill the template:\n${problems.join("\n")}`);
  const changed = [];
  const left = [];
  for (const relativePath of filesToFill(root)) {
    const file = path.join(root, relativePath);
    const text = readFileSync(file, "utf8");
    if (placeholdersIn(text).length === 0) continue;
    const filled = fill(text, values);
    changed.push(relativePath);
    if (placeholdersIn(filled).length > 0) left.push(relativePath);
    if (!dryRun) writeFileSync(file, filled);
  }
  return { changed, left };
};

export const parseArguments = (argv) => {
  const flag = (name) => {
    const prefix = `--${name}=`;
    return argv
      .find((argument) => argument.startsWith(prefix))
      ?.slice(prefix.length);
  };
  const values = argv.includes("--fixture")
    ? { ...FIXTURE }
    : Object.fromEntries(PLACEHOLDERS.map((key) => [key, flag(FLAGS[key])]));
  return {
    dryRun: argv.includes("--dry-run"),
    root: flag("root") ?? new URL("..", import.meta.url).pathname,
    values,
  };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const { dryRun, root, values } = parseArguments(process.argv.slice(2));
  const problems = validate(values);
  if (problems.length > 0) {
    console.error(
      `init-product: can't fill the template:\n  ${problems.join("\n  ")}`,
    );
    process.exit(2);
  }
  console.log(
    `init-product: filling ${root} as ${values.PRODUCT} (${values.SLUG})${dryRun ? ", dry run" : ""}`,
  );
  for (const key of PLACEHOLDERS) console.log(`  ${key} = ${values[key]}`);
  const { changed, left } = initProduct(root, values, { dryRun });
  for (const relativePath of changed)
    console.log(`  ${dryRun ? "would fill" : "filled"} ${relativePath}`);
  console.log(
    `init-product: ${changed.length} file(s) ${dryRun ? "would change" : "changed"}`,
  );
  if (left.length > 0) {
    console.error(
      `init-product: placeholders left in:\n  ${left.join("\n  ")}`,
    );
    process.exit(1);
  }
}
