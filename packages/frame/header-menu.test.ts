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

import { HEADER_MENU_BREAKPOINT, nextMenuState } from "./header-menu-config.ts";

test("the header switches to the menu under 1050px, where all the links still fit a nav gap clear of the wordmark", () => {
  assert.equal(HEADER_MENU_BREAKPOINT, 1050);
});

test("the menu opens on the button and closes on the button, Escape, a link or a click outside", () => {
  assert.equal(nextMenuState(false, "toggle"), true);
  assert.equal(nextMenuState(true, "toggle"), false);
  for (const event of ["escape", "link", "outside"] as const) {
    assert.equal(nextMenuState(true, event), false, event);
    assert.equal(nextMenuState(false, event), false, event);
  }
});
