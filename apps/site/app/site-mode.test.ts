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

import { isComingSoonBuild, prerenderPaths, siteRoutes } from "./site-mode.ts";

test("SITE_COMING_SOON=true makes a coming-soon build, and nothing else does", () => {
  assert.equal(isComingSoonBuild({ SITE_COMING_SOON: "true" }), true);
  assert.equal(isComingSoonBuild({}), false);
  assert.equal(isComingSoonBuild({ SITE_COMING_SOON: "1" }), false);
  assert.equal(isComingSoonBuild({ SITE_COMING_SOON: "false" }), false);
});

test("a coming-soon build routes the coming-soon page as the index and nothing else", () => {
  assert.deepEqual(siteRoutes(true), [
    { file: "routes/coming-soon.tsx", path: "/" },
  ]);
  assert.deepEqual(prerenderPaths(true), ["/"]);
});

test("every other build keeps the landing and Releases pages, and the coming-soon page beside them", () => {
  assert.deepEqual(prerenderPaths(false), ["/", "/releases", "/coming-soon"]);
  assert.equal(siteRoutes(false)[0].file, "routes/home.tsx");
});
