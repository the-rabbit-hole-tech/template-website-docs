// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import { index, route, type RouteConfig } from "@react-router/dev/routes";

import { isComingSoonBuild, siteRoutes } from "./site-mode";

// The routes come from site-mode.ts: a coming-soon build routes the
// coming-soon page alone. react-router.config.ts prerenders the same list.
export default siteRoutes(isComingSoonBuild(process.env)).map(
  ({ file, path }) => (path === "/" ? index(file) : route(path.slice(1), file)),
) satisfies RouteConfig;
