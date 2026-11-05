// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
