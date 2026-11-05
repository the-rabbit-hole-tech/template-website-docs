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
// The one place a product names itself. Every other file reads these values,
// so filling them in (scripts/init-product.mjs, see TEMPLATE.md) turns the
// template into a product's site and docs. Each value is a marked
// placeholder until then.
//
// - name: the product's name as people write it.
// - slug: lowercase letters, digits and hyphens. It names the Cloudflare
//   Pages projects (<slug>-www, <slug>-docs) and the browser storage keys
//   (<slug>-site, <slug>-docs).
// - domain: the product site's host, without a scheme.
// - docsDomain: the docs site's host, without a scheme.
// - githubOrg: the GitHub organisation or user that holds the product.
// - tagline: one short line under the name.
// - copyrightHolder: who the footer's copyright line names.
export const product = {
  copyrightHolder: "{{COPYRIGHT_HOLDER}}",
  docsDomain: "{{DOCS_DOMAIN}}",
  domain: "{{DOMAIN}}",
  githubOrg: "{{GITHUB_ORG}}",
  name: "{{PRODUCT}}",
  slug: "{{SLUG}}",
  tagline: "{{TAGLINE}}",
} as const;

export const siteUrl = `https://${product.domain}`;
export const docsUrl = `https://${product.docsDomain}`;
export const githubUrl = `https://github.com/${product.githubOrg}`;

// The storage key prefixes for the consent store (consent.ts): one per site,
// so the site and the docs keep their answers apart.
export const SITE_CONSENT_PREFIX = `${product.slug}-site`;
export const DOCS_CONSENT_PREFIX = `${product.slug}-docs`;
