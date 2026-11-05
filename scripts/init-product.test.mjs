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
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  filesToFill,
  fill,
  FIXTURE,
  initProduct,
  parseArguments,
  PLACEHOLDERS,
  placeholdersIn,
  validate,
} from "./init-product.mjs";

const tree = (files) => {
  const root = mkdtempSync(path.join(tmpdir(), "init-product-"));
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(path.join(root, path.dirname(name)), { recursive: true });
    writeFileSync(path.join(root, name), body);
  }
  return root;
};

const read = (root, name) => readFileSync(path.join(root, name), "utf8");

test("the placeholders are the ones packages/frame/product.ts names", () => {
  assert.deepEqual(PLACEHOLDERS, [
    "PRODUCT",
    "SLUG",
    "DOMAIN",
    "DOCS_DOMAIN",
    "GITHUB_ORG",
    "TAGLINE",
    "COPYRIGHT_HOLDER",
  ]);
  const product = readFileSync(
    new URL("../packages/frame/product.ts", import.meta.url),
    "utf8",
  );
  const found = placeholdersIn(product);
  // A filled tree has none left; the template has every one.
  if (found.length > 0)
    assert.deepEqual(found.toSorted(), PLACEHOLDERS.toSorted());
});

test("the fixture is a fictional product on example.com addresses, and it's valid", () => {
  assert.equal(FIXTURE.SLUG, "acme");
  assert.match(FIXTURE.DOMAIN, /(^|\.)example\.com$/);
  assert.match(FIXTURE.DOCS_DOMAIN, /(^|\.)example\.com$/);
  assert.deepEqual(validate(FIXTURE), []);
});

test("every value is checked before anything is written", () => {
  const problems = validate({
    ...FIXTURE,
    DOCS_DOMAIN: "",
    DOMAIN: "https://acme.example.com",
    GITHUB_ORG: "-acme",
    PRODUCT: "Acme: the product",
    SLUG: "Acme Co",
    TAGLINE: 'Say "hi"',
  });
  assert.equal(problems.length, 6, problems.join("\n"));
  assert.match(problems.join("\n"), /SLUG/);
  assert.match(problems.join("\n"), /DOMAIN/);
  assert.match(problems.join("\n"), /DOCS_DOMAIN/);
  assert.match(problems.join("\n"), /GITHUB_ORG/);
  assert.match(problems.join("\n"), /TAGLINE/);
  assert.match(problems.join("\n"), /PRODUCT/);
  assert.match(
    validate({ ...FIXTURE, COPYRIGHT_HOLDER: undefined }).join(","),
    /COPYRIGHT_HOLDER/,
  );
});

test("fill replaces only the known placeholders, and leaves GitHub expressions alone", () => {
  const text =
    'name: "{{PRODUCT}}" ${{ github.ref }} {{UNKNOWN}} {{SLUG}}-www {{SLUG}}-docs';
  assert.equal(
    fill(text, FIXTURE),
    `name: "${FIXTURE.PRODUCT}" \${{ github.ref }} {{UNKNOWN}} acme-www acme-docs`,
  );
  assert.deepEqual(placeholdersIn(text), ["PRODUCT", "SLUG"]);
});

test("the walk skips dependencies, builds, git, binaries, the lockfile and the template's own guide", () => {
  const root = tree({
    ".git/config": "{{PRODUCT}}",
    ".github/workflows/deploy.yml": "project: {{SLUG}}-www",
    "apps/docs/.docusaurus/x.js": "{{PRODUCT}}",
    "apps/docs/docs/intro.md": "# {{PRODUCT}}",
    "apps/site/build/client/index.html": "{{PRODUCT}}",
    "node_modules/x/index.js": "{{PRODUCT}}",
    "package-lock.json": "{{PRODUCT}}",
    "packages/brand/public/img/og-card.png": "{{PRODUCT}}",
    "packages/frame/product.ts": 'export const name = "{{PRODUCT}}";',
    "scripts/init-product.mjs": "{{PRODUCT}}",
    "TEMPLATE.md": "Fill in {{PRODUCT}}",
  });
  assert.deepEqual(filesToFill(root).toSorted(), [
    ".github/workflows/deploy.yml",
    "apps/docs/docs/intro.md",
    "packages/frame/product.ts",
  ]);
});

test("initProduct fills every file in place and reports what it changed", () => {
  const root = tree({
    "apps/docs/docs/intro.md": "# What is {{PRODUCT}}?\n\n{{TAGLINE}}\n",
    "packages/frame/product.ts":
      'export const product = { name: "{{PRODUCT}}", slug: "{{SLUG}}" };',
    "README.md": "No placeholders here.\n",
    "TEMPLATE.md": "Fill in {{PRODUCT}}",
  });
  const result = initProduct(root, FIXTURE);
  assert.deepEqual(result.changed.toSorted(), [
    "apps/docs/docs/intro.md",
    "packages/frame/product.ts",
  ]);
  assert.deepEqual(result.left, []);
  assert.equal(
    read(root, "packages/frame/product.ts"),
    'export const product = { name: "Acme", slug: "acme" };',
  );
  assert.equal(
    read(root, "apps/docs/docs/intro.md"),
    `# What is Acme?\n\n${FIXTURE.TAGLINE}\n`,
  );
  assert.equal(read(root, "TEMPLATE.md"), "Fill in {{PRODUCT}}");
  assert.deepEqual(
    initProduct(root, FIXTURE).changed,
    [],
    "a second run changes nothing",
  );
});

test("a dry run writes nothing, and invalid values write nothing either", () => {
  const root = tree({ "a.ts": "{{PRODUCT}}" });
  assert.deepEqual(initProduct(root, FIXTURE, { dryRun: true }).changed, [
    "a.ts",
  ]);
  assert.equal(read(root, "a.ts"), "{{PRODUCT}}");
  assert.throws(
    () => initProduct(root, { ...FIXTURE, SLUG: "Not A Slug" }),
    /SLUG/,
  );
  assert.equal(read(root, "a.ts"), "{{PRODUCT}}");
});

test("the command line takes --fixture, or every value as a flag, and --root and --dry-run", () => {
  assert.deepEqual(parseArguments(["--fixture"]).values, FIXTURE);
  const arguments_ = parseArguments([
    "--product=Widget",
    "--slug=widget",
    "--domain=www.widget.example.org",
    "--docs-domain=docs.widget.example.org",
    "--github-org=widget-org",
    "--tagline=Widgets, done well",
    "--copyright-holder=Widget Org",
    "--root=/tmp/x",
    "--dry-run",
  ]);
  assert.deepEqual(arguments_.values, {
    COPYRIGHT_HOLDER: "Widget Org",
    DOCS_DOMAIN: "docs.widget.example.org",
    DOMAIN: "www.widget.example.org",
    GITHUB_ORG: "widget-org",
    PRODUCT: "Widget",
    SLUG: "widget",
    TAGLINE: "Widgets, done well",
  });
  assert.equal(arguments_.root, "/tmp/x");
  assert.equal(arguments_.dryRun, true);
  assert.equal(parseArguments(["--product=Widget"]).values.SLUG, undefined);
});
