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
