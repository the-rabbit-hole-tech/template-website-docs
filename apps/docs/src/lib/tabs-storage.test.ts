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

import { tabsWithoutStorage } from "./tabs-storage.ts";

test("before consent a tab group keeps its choice in the URL, not in storage", () => {
  assert.deepEqual(
    tabsWithoutStorage({ groupId: "os", queryString: true }, false),
    {
      groupId: undefined,
      queryString: "os",
    },
  );
  assert.deepEqual(tabsWithoutStorage({ groupId: "os" }, false), {
    groupId: undefined,
    queryString: "os",
  });
  assert.deepEqual(
    tabsWithoutStorage({ groupId: "os", queryString: "platform" }, false),
    {
      groupId: undefined,
      queryString: "platform",
    },
  );
});

test("after consent a tab group remembers its choice as Docusaurus does", () => {
  const properties = { groupId: "os", queryString: true };
  assert.equal(tabsWithoutStorage(properties, true), properties);
});

test("a tab group with no groupId is left alone", () => {
  const properties = { queryString: false };
  assert.equal(tabsWithoutStorage(properties, false), properties);
});
