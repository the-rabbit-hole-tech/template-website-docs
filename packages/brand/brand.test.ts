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
import { readFileSync } from "node:fs";
import { test } from "node:test";

const file = (name: string) =>
  readFileSync(new URL(`public/${name}`, import.meta.url));

test("the apple-touch-icon is a 180x180 PNG", () => {
  const png = file("apple-touch-icon.png");
  assert.equal(png.subarray(1, 4).toString("latin1"), "PNG", "not a PNG");
  assert.equal(png.readUInt32BE(16), 180, "width");
  assert.equal(png.readUInt32BE(20), 180, "height");
});

test("the light and dark marks and the favicon are SVGs", () => {
  for (const name of [
    "favicon.svg",
    "img/brand/mark-light.svg",
    "img/brand/mark-dark.svg",
  ]) {
    assert.match(
      file(name).toString("utf8"),
      /<svg[\s>]/,
      `${name} is not an SVG`,
    );
  }
});

test("the link-preview card is a 1200x630 PNG", () => {
  const png = file("img/brand/og-card.png");
  assert.equal(png.subarray(1, 4).toString("latin1"), "PNG", "not a PNG");
  assert.equal(png.readUInt32BE(16), 1200, "width");
  assert.equal(png.readUInt32BE(20), 630, "height");
});
