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
