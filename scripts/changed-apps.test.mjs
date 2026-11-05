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

import { changedApps } from "./changed-apps.mjs";

test("a docs-only change builds the docs only", () => {
  assert.deepEqual(changedApps(["apps/docs/docs/getting-started.md"]), {
    docsChanged: true,
    siteChanged: false,
  });
});

test("a site-only change builds the site only", () => {
  assert.deepEqual(changedApps(["apps/site/app/content/release.ts"]), {
    docsChanged: false,
    siteChanged: true,
  });
});

test("a shared package, manifest or workflow builds both", () => {
  for (const file of [
    "packages/frame/site-frame.css",
    "package-lock.json",
    ".github/workflows/checks.yml",
    "scripts/docs-version.mjs",
  ]) {
    assert.deepEqual(
      changedApps([file]),
      { docsChanged: true, siteChanged: true },
      file,
    );
  }
});

test("root docs alone build neither app", () => {
  assert.deepEqual(
    changedApps(["README.md", "AGENTS.md", "NOTICE", "docs/deploy.md"]),
    {
      docsChanged: false,
      siteChanged: false,
    },
  );
});
