// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
// The frame every full page shares: the strip's and header's links, the nav
// and the footer, with the site's own pages under its base path.
import { frameFooter, frameNav } from "@product/frame/content";
import { docsUrl } from "@product/frame/product";
import { frameLinks } from "@product/frame/strip";

// The site's own links stay under its base path ("/" in the real build, a
// sub-path in a preview); the docs live on their own address. A preview
// build sets VITE_DOCS_URL so the two previews link to each other.
const docs = (import.meta.env?.VITE_DOCS_URL as string | undefined) || docsUrl;
const base = import.meta.env?.BASE_URL ?? "/";

export const links = frameLinks({ docsUrl: docs, siteUrl: base });

export const nav = { links: frameNav(links) };

export const footer = frameFooter(links);
