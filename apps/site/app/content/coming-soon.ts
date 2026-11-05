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
// The coming-soon page's words: the whole site of a coming-soon release
// (app/site-mode.ts). Nothing here describes how the product works, and none
// of it comes from the landing page, so check-release-build.ts can tell the
// two apart.
import { product } from "@product/frame/product";

export const comingSoon = {
  line: "Coming soon.",
  // The mark from packages/brand. Decorative: the name is set right beside it.
  mark: {
    alt: "",
    dark: "img/brand/mark-dark.svg",
    light: "img/brand/mark-light.svg",
  },
  name: product.name,
  tagline: product.tagline,
  title: `${product.name}: coming soon`,
};
