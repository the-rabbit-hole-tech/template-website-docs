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
import { test } from "node:test";

import { indexPage, landingCopy, landingLeaks } from "./check-release-build.ts";

const landing = ["The first thing it does", "Read the docs please"];
const comingSoonHtml =
  "<html><body><h1>Example</h1><p>Coming soon.</p></body></html>";

test("a coming-soon build with only the coming-soon page passes", () => {
  const files = {
    "__spa-fallback.html": "<html></html>",
    "assets/coming-soon-abc.js": "x",
    "assets/root-abc.js": "x",
    "index.html": comingSoonHtml,
  };
  assert.deepEqual(landingLeaks(files, landing), []);
});

test("a coming-soon build that carries landing copy fails", () => {
  const files = {
    "assets/chunk-abc.js": 'const a="The first thing it does"',
    "index.html": comingSoonHtml,
  };
  assert.deepEqual(landingLeaks(files, landing), [
    'assets/chunk-abc.js contains "The first thing it does"',
  ]);
});

test("a coming-soon build with a full-site route module or an extra page fails", () => {
  const files = {
    "assets/home-1a2b.js": "x",
    "assets/releases-9f8e.js": "x",
    "index.html": comingSoonHtml,
    "releases/index.html": comingSoonHtml,
  };
  assert.deepEqual(landingLeaks(files, landing).toSorted(), [
    "assets/home-1a2b.js is a full-site route module",
    "assets/releases-9f8e.js is a full-site route module",
    "releases/index.html is a page other than the index",
  ]);
});

test("a build under a base path has its index there, and only there", () => {
  assert.equal(indexPage(), "index.html");
  assert.equal(indexPage("/"), "index.html");
  assert.equal(indexPage("/preview/site/"), "preview/site/index.html");
  const files = {
    "__spa-fallback.html": "<html></html>",
    "preview/site/index.html": comingSoonHtml,
  };
  assert.deepEqual(
    landingLeaks(files, landing, indexPage("/preview/site/")),
    [],
  );
  assert.deepEqual(
    landingLeaks(
      { "index.html": comingSoonHtml },
      landing,
      indexPage("/preview/site/"),
    ),
    ["index.html is a page other than the index"],
  );
});

test("the landing copy leaves out what the coming-soon page also says", () => {
  const copy = landingCopy();
  assert.ok(copy.includes("The first thing it does"));
  for (const text of copy) assert.ok(text.length >= 12, text);
});
