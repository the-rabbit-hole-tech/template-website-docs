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
// The landing page's words, in one place. The template's copy is a
// placeholder: a product replaces every string here with its own (TEMPLATE.md).
// check-release-build.ts reads this file, so none of it may reach a
// coming-soon build.
import { product } from "@product/frame/product";

export const homeMeta = {
  description: `${product.name}: ${product.tagline}`,
};

export const intro = {
  eyebrow: "Placeholder copy",
  heading: product.name,
  lede: product.tagline,
  primaryLabel: "Read the docs",
  secondaryLabel: "See the releases",
};

export const features = {
  eyebrow: "Features",
  heading: "What the product does",
  items: [
    {
      body: "Say what it does and who it helps, in a sentence or two.",
      title: "The first thing it does",
    },
    {
      body: "Name the problem it removes, not the technology behind it.",
      title: "The second thing it does",
    },
    {
      body: "Point at the docs page that shows it working.",
      title: "The third thing it does",
    },
  ],
  lede: "Three short cards, each one thing the product does for the people who use it.",
};
