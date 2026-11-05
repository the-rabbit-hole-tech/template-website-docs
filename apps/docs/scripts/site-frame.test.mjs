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

// The frame match: the product site and the docs draw the same strip,
// header, footer and switches from packages/frame, and serve the same brand
// assets. These check that the docs load the frame the way the site does, so
// the two can't drift apart. Sources are read with the formatting taken out
// (no whitespace, one kind of quote), so the checks follow the code, not its
// layout.
const read = (path) =>
  readFileSync(new URL(path, import.meta.url), "utf8")
    .replaceAll(/\s+/g, "")
    .replaceAll("'", '"');
const config = read("../docusaurus.config.ts");
const root = read("../../site/app/root.tsx");
const nav = read("../../site/app/components/nav.tsx");

test("the docs load the shared frame first, then their theme and page styles", () => {
  assert.ok(config.includes('constframePackage="../../packages/frame";'));
  assert.ok(
    config.includes(
      'customCss:[`${framePackage}/site-frame.css`,"./src/css/theme.css","./src/css/custom.css",]',
    ),
  );
});

test("the site loads the shared frame before its own styles", () => {
  const frame = root.indexOf('import"@product/frame/site-frame.css";');
  const app = root.indexOf('import"./app.css";');
  assert.ok(frame !== -1 && app > frame);
});

test("both sites serve the shared fonts folder and brand assets from their root", () => {
  assert.ok(
    config.includes(
      'staticDirectories:["static",`${framePackage}/public`,`${brandPackage}/public`,]',
    ),
  );
  const vite = read("../../site/vite.config.ts");
  assert.ok(vite.includes("packages/frame/public/"));
  assert.ok(vite.includes("packages/brand/public/"));
  for (const name of [
    "favicon.svg",
    "apple-touch-icon.png",
    "img/brand/mark-light.svg",
    "img/brand/mark-dark.svg",
    "img/brand/og-card.png",
  ]) {
    const file = new URL(
      `../../../packages/brand/public/${name}`,
      import.meta.url,
    );
    assert.ok(readFileSync(file).length > 0, name);
  }
});

test("both sites preload the same fonts, from the one list in packages/frame", () => {
  for (const source of [config, root]) {
    assert.ok(
      source.includes(
        'import{fontFaceCss,fontUrl,PRELOAD_FONTS}from"@product/frame/fonts";',
      ),
    );
  }
});

test("both headers are built from the same links, mark, switch and menu", () => {
  assert.ok(config.includes("frameNav(links)"));
  assert.ok(config.includes('type:"custom-themeToggle"'));
  assert.ok(config.includes('type:"custom-headerMenu"'));
  assert.ok(config.includes('src:"img/brand/mark-light.svg"'));
  assert.ok(nav.includes('<HeaderMenuas="li"links={links}/>'));
  assert.ok(nav.includes("<ThemeSwitch/>"));
  assert.ok(
    read("../../site/app/components/mark.tsx").includes(
      "img/brand/mark-light.svg",
    ),
  );
});

test("both footers carry the same legal line, and both pages the same strip", () => {
  assert.ok(
    config.includes(
      "copyright:legalHtml(footer.marks,newDate().getFullYear())",
    ),
  );
  assert.ok(
    read("../../site/app/components/footer.tsx").includes(
      "legalHtml(marks,newDate().getFullYear())",
    ),
  );
  assert.ok(config.includes("stripHtml:stripHtml(links)"));
  assert.ok(
    read("../../site/app/components/strip.tsx").includes("stripHtml(links)"),
  );
});
