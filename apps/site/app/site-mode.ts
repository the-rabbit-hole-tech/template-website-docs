// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
// Which pages a build holds. A coming-soon build (SITE_COMING_SOON=true, set
// by `npm run build:coming-soon`) is the coming-soon page alone, as the index:
// the landing page and the Releases page are neither built nor routed. Every
// other build (dev, CI, previews, a full release) keeps the landing page as
// the index, the Releases page, and the coming-soon page at /coming-soon, so
// all of them can be worked on.
export const isComingSoonBuild = (
  environment: Record<string, string | undefined>,
): boolean => environment.SITE_COMING_SOON === "true";

export interface SiteRoute {
  file: string;
  path: string;
}

export const siteRoutes = (comingSoon: boolean): SiteRoute[] => {
  if (comingSoon) return [{ file: "routes/coming-soon.tsx", path: "/" }];
  return [
    { file: "routes/home.tsx", path: "/" },
    { file: "routes/releases.tsx", path: "/releases" },
    { file: "routes/coming-soon.tsx", path: "/coming-soon" },
  ];
};

export const prerenderPaths = (comingSoon: boolean): string[] =>
  siteRoutes(comingSoon).map((route) => route.path);
