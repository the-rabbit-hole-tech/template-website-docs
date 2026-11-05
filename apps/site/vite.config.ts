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
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { sharedPublic } from "./shared-public";

// See react-router.config.ts: the same PREVIEW_BASE_PATH, read here so the
// asset URLs match the router's basename in a one-off preview build.
export default defineConfig({
  base: process.env.PREVIEW_BASE_PATH || "/",
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    // The fonts (packages/frame) and the marks and icons (packages/brand) are
    // served from the site root, the same as the docs serve them.
    sharedPublic([
      new URL("../../packages/frame/public/", import.meta.url).pathname,
      new URL("../../packages/brand/public/", import.meta.url).pathname,
    ]),
  ],
  // React Router's dev plugin pre-bundles react-router-dom whenever it can
  // resolve it, and in this workspace it resolves to the docs' Docusaurus copy
  // (v5), which breaks the dev server. In v7 react-router-dom only re-exports
  // react-router, so point it there. The site itself never imports it.
  resolve: {
    alias: { "react-router-dom": "react-router" },
  },
});
