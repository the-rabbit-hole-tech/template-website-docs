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
import { release } from "./release.ts";

// The strip both sites show above the header: the current release and, before
// v1.0.0, the pre-1.0 warning. The site renders this markup in its own page and the docs
// pass it to Docusaurus's announcement bar, so the two are the same bytes
// and site-frame.css draws them the same way.

export interface FrameLinks {
  docs: string;
  releases: string;
  site: string;
  status: string;
}

export interface ReleaseStrip {
  badge: string;
  body: string;
  heading: string;
  links: StripLink[];
}

export interface StripLink {
  href: string;
  label: string;
}

const trimSlash = (url: string) => url.replace(/\/+$/, "");

// Where each site lives. A preview build passes its own addresses so the two
// previews link to each other instead of the live sites.
export const frameLinks = ({
  docsUrl,
  siteUrl,
}: {
  docsUrl: string;
  siteUrl: string;
}): FrameLinks => {
  const site = trimSlash(siteUrl);
  const docs = trimSlash(docsUrl);
  return {
    docs,
    // The downloads live on the site's Releases page, never in the footer.
    releases: `${site}/releases`,
    site,
    status: `${docs}/docs/status`,
  };
};

// Before v1.0.0 the strip says any release may still change fundamentally;
// from v1.0.0 on it only names the release.
export const isPreOne = (version: string) => version.startsWith("v0.");

export const releaseStrip = (links: FrameLinks): ReleaseStrip => {
  return {
    badge: release.kind === "prerelease" ? "Pre-release" : "Release",
    body: isPreOne(release.version)
      ? "Until v1.0.0, any release may change fundamentally."
      : "",
    heading: `${release.version} is out.`,
    links: [
      { href: links.releases, label: `Download ${release.version}` },
      { href: links.status, label: "Project status" },
    ],
  };
};

const escape = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const stripHtml = (links: FrameLinks): string => {
  const strip = releaseStrip(links);
  const anchors = strip.links
    .map(
      (link) =>
        `<a class="strip__link" href="${escape(link.href)}">${escape(link.label)}</a>`,
    )
    .join(" ");
  return (
    `<div class="strip__row">` +
    `<span class="strip__badge"><span class="strip__dot" aria-hidden="true"></span>${escape(strip.badge)}</span>` +
    `<p class="strip__text"><strong>${escape(strip.heading)}</strong> ${strip.body ? `${escape(strip.body)} ` : ""}${anchors}</p>` +
    `</div>`
  );
};
