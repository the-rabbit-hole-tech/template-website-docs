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
import { release } from "@product/frame/release";
import assert from "node:assert/strict";
import { test } from "node:test";

import { vnextBannerText } from "./vnext-banner.ts";

test("the vNext banner names the upcoming and the current release", () => {
  assert.equal(
    vnextBannerText({ upcoming: "v1.1.0", version: "v1.0.0" }),
    "This page describes planned work, or work that may ship soon in v1.1.0. The current release is v1.0.0.",
  );
});

test("the banner reads the versions from packages/frame/release.ts", () => {
  assert.match(
    vnextBannerText(release),
    new RegExp(
      `soon in ${release.upcoming}\\. The current release is ${release.version}\\.$`,
    ),
  );
});
