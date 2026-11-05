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
import type { MetaDescriptor } from "react-router";

// The page title and link-preview tags every route uses, so each page shares
// one shape: the title and description, Open Graph and the Twitter card,
// with absolute URLs, since link previews never resolve relative ones.
import { product, siteUrl } from "@product/frame/product";

export const SITE_NAME = product.name;
export const SITE_URL = siteUrl;

// The link-preview card from packages/brand, served at the site root.
export const OG_IMAGE = {
  alt: `The ${product.name} mark.`,
  height: 630,
  path: "/img/brand/og-card.png",
  type: "image/png",
  width: 1200,
};

// The home page leads with the product and its tagline; every other page
// leads with its own name.
export const pageTitle = (page?: string) =>
  page
    ? `${page} \u00B7 ${SITE_NAME}`
    : `${SITE_NAME} \u2014 ${product.tagline}`;

export interface PageMetaInput {
  description: string;
  /** The page's path on the live site, from the root. */
  path: string;
  /** The page's own name; the home page leaves it out. */
  title?: string;
}

export const pageMeta = ({
  description,
  path,
  title,
}: PageMetaInput): MetaDescriptor[] => {
  const fullTitle = pageTitle(title);
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}${OG_IMAGE.path}`;
  return [
    { title: fullTitle },
    { content: description, name: "description" },
    { content: SITE_NAME, property: "og:site_name" },
    { content: fullTitle, property: "og:title" },
    { content: description, property: "og:description" },
    { content: "website", property: "og:type" },
    { content: url, property: "og:url" },
    { content: image, property: "og:image" },
    { content: String(OG_IMAGE.width), property: "og:image:width" },
    { content: String(OG_IMAGE.height), property: "og:image:height" },
    { content: OG_IMAGE.type, property: "og:image:type" },
    { content: OG_IMAGE.alt, property: "og:image:alt" },
    { content: "summary_large_image", name: "twitter:card" },
    { content: fullTitle, name: "twitter:title" },
    { content: description, name: "twitter:description" },
    { content: image, name: "twitter:image" },
    { content: OG_IMAGE.alt, name: "twitter:image:alt" },
  ];
};
