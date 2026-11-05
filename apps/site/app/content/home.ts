// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
