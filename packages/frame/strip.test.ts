// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";

import { release } from "./release.ts";
import { frameLinks, isPreOne, releaseStrip, stripHtml } from "./strip.ts";

const links = frameLinks({
  docsUrl: "https://docs.example",
  siteUrl: "https://site.example/",
});

test("the frame links drop a trailing slash and keep the two sites apart", () => {
  assert.equal(links.site, "https://site.example");
  assert.equal(links.docs, "https://docs.example");
  assert.equal(links.status, "https://docs.example/docs/status");
});

test("the strip names the current release and links the site's Releases page and the project status", () => {
  const strip = releaseStrip(links);
  assert.equal(strip.heading, `${release.version} is out.`);
  assert.deepEqual(
    strip.links.map((link) => link.href),
    ["https://site.example/releases", "https://docs.example/docs/status"],
  );
});

test("the strip markup is the same for both sites and escapes its text", () => {
  const html = stripHtml(links);
  assert.match(html, /^<div class="strip__row">/);
  const badge = release.kind === "prerelease" ? "Pre-release" : "Release";
  assert.ok(
    html.includes(
      `<span class="strip__badge"><span class="strip__dot" aria-hidden="true"></span>${badge}</span>`,
    ),
  );
  assert.ok(html.includes(`<strong>${release.version} is out.</strong>`));
  assert.ok(!html.includes("undefined"));
  assert.equal(stripHtml(links), html);
});

test("the pre-1.0 note shows only before v1.0.0", () => {
  assert.equal(isPreOne("v0.4.2"), true);
  assert.equal(isPreOne("v0.1.0-rc.1"), true);
  assert.equal(isPreOne("v1.0.0"), false);
  assert.equal(isPreOne("v10.0.0"), false);
  const strip = releaseStrip(links);
  assert.equal(strip.body === "", !isPreOne(release.version));
});
