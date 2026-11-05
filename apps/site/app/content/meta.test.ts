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
import { product } from "@product/frame/product";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { siteRoutes } from "../site-mode.ts";
import { OG_IMAGE, pageMeta, pageTitle, SITE_NAME, SITE_URL } from "./meta.ts";

type Tag = Record<string, string>;

const tag = (tags: Tag[], key: "name" | "property", value: string) =>
  tags.find((entry) => entry[key] === value)?.content;

test("titles use the site's separators, never a double hyphen", () => {
  assert.equal(pageTitle(), `${product.name} \u2014 ${product.tagline}`);
  assert.equal(pageTitle("Releases"), `Releases \u00B7 ${product.name}`);
  assert.doesNotMatch(pageTitle(), /--/);
});

test("every page carries the full Open Graph and Twitter card set, with absolute URLs", () => {
  const tags = pageMeta({
    description: "Downloads.",
    path: "/releases",
    title: "Releases",
  }) as Tag[];
  assert.equal(tags[0].title, `Releases \u00B7 ${SITE_NAME}`);
  assert.equal(tag(tags, "name", "description"), "Downloads.");
  assert.equal(
    tag(tags, "property", "og:title"),
    `Releases \u00B7 ${SITE_NAME}`,
  );
  assert.equal(tag(tags, "property", "og:description"), "Downloads.");
  assert.equal(tag(tags, "property", "og:type"), "website");
  assert.equal(tag(tags, "property", "og:site_name"), SITE_NAME);
  assert.equal(tag(tags, "property", "og:url"), `${SITE_URL}/releases`);
  assert.equal(
    tag(tags, "property", "og:image"),
    `${SITE_URL}${OG_IMAGE.path}`,
  );
  assert.equal(tag(tags, "property", "og:image:width"), "1200");
  assert.equal(tag(tags, "property", "og:image:height"), "630");
  assert.equal(tag(tags, "property", "og:image:type"), "image/png");
  assert.ok(tag(tags, "property", "og:image:alt"));
  assert.equal(tag(tags, "name", "twitter:card"), "summary_large_image");
  assert.equal(
    tag(tags, "name", "twitter:image"),
    `${SITE_URL}${OG_IMAGE.path}`,
  );
  assert.equal(
    tag(tags, "name", "twitter:image:alt"),
    tag(tags, "property", "og:image:alt"),
  );
  for (const entry of tags) {
    if (/url|image$/.test(entry.property ?? entry.name ?? "")) {
      assert.ok(
        (entry.content ?? "").startsWith(`${SITE_URL}/`),
        entry.content,
      );
    }
  }
});

test("the home page's URL is the site root", () => {
  const tags = pageMeta({ description: "Home.", path: "/" }) as Tag[];
  assert.equal(tag(tags, "property", "og:url"), `${SITE_URL}/`);
  assert.equal(tags[0].title, pageTitle());
});

test("the card image is the one packages/brand ships", () => {
  const png = readFileSync(
    new URL(
      `../../../../packages/brand/public${OG_IMAGE.path}`,
      import.meta.url,
    ),
  );
  assert.equal(png.readUInt32BE(16), OG_IMAGE.width);
  assert.equal(png.readUInt32BE(20), OG_IMAGE.height);
});

test("every site route builds its meta with pageMeta", () => {
  const files = [
    ...new Set(
      [...siteRoutes(false), ...siteRoutes(true)].map((route) => route.file),
    ),
  ];
  assert.ok(files.length >= 3, "no routes found");
  for (const file of files) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(
      source,
      /export const meta: MetaFunction = \(\) =>\s*pageMeta\(/,
      `${file} does not build its meta with pageMeta`,
    );
  }
});
