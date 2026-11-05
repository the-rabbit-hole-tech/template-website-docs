// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
