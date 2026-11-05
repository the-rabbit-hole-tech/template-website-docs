// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
