// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
