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
import type { Config } from "@react-router/dev/config";

import { isComingSoonBuild, prerenderPaths } from "./app/site-mode";

// Prerender every route to static HTML at build time, with no server at
// request time: ssr: false plus a prerender list is React Router v7's
// static-site mode. SITE_COMING_SOON=true builds the coming-soon page alone
// (app/site-mode.ts).
//
// PREVIEW_BASE_PATH lets a one-off preview build (served from a sub-path on
// someone else's server) set the router's basename without touching this
// file; it's unset in the real build, so basename defaults to "/".
const basename = process.env.PREVIEW_BASE_PATH || "/";

export default {
  basename,
  async prerender() {
    return prerenderPaths(isComingSoonBuild(process.env));
  },
  ssr: false,
} satisfies Config;
