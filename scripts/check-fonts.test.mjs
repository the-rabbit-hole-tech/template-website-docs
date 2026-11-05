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
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";

import { checkFonts } from "./check-fonts.mjs";

const build = (files) => {
  const directory = mkdtempSync(path.join(tmpdir(), "check-fonts-"));
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(path.join(directory, name, ".."), { recursive: true });
    writeFileSync(path.join(directory, name), body);
  }
  return directory;
};

test("a font URL under the base path that resolves to a file passes", () => {
  const directory = build({
    "assets/app.css":
      '@font-face{src:url("/sub/fonts/a.woff2") format("woff2")}',
    "fonts/a.woff2": "x",
    "index.html":
      '<link rel="preload" href="/sub/fonts/a.woff2"><style>@font-face{src:url("/sub/fonts/a.woff2")}</style>',
  });
  const result = checkFonts(directory, "/sub/");
  assert.deepEqual(result.broken, []);
  assert.equal(result.checked, 3);
});

test("a bare /fonts/ URL fails in a sub-path build", () => {
  const directory = build({
    "assets/app.css": '@font-face{src:url("/fonts/a.woff2")}',
    "fonts/a.woff2": "x",
  });
  assert.deepEqual(checkFonts(directory, "/sub/").broken, [
    {
      file: path.join("assets", "app.css"),
      url: "/fonts/a.woff2",
      why: "not under /sub/",
    },
  ]);
});

test("a font URL with no file behind it fails", () => {
  const directory = build({
    "index.html": '<link rel="preload" href="/sub/fonts/missing.woff2">',
  });
  assert.equal(checkFonts(directory, "/sub/").broken[0].why, "no such file");
});

test("a build with no font URLs at all fails, so the check can't pass by accident", () => {
  const directory = build({ "index.html": "<p>no fonts</p>" });
  assert.equal(checkFonts(directory, "/sub/").checked, 0);
});
