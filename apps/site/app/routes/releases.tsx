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
import type { MetaFunction } from "react-router";

import { product } from "@product/frame/product";
import { isPreOne } from "@product/frame/strip";

import { Downloads } from "~/components/downloads";
import { Footer } from "~/components/footer";
import { Nav } from "~/components/nav";
import { Section } from "~/components/section";
import { Strip } from "~/components/strip";
import { pageMeta } from "~/content/meta";
import { downloads, release } from "~/content/release";
import { footer, links, nav } from "~/content/site";

const description = `Download ${product.name} ${release.version}, and read what changed.`;

export const meta: MetaFunction = () =>
  pageMeta({ description, path: "/releases", title: "Releases" });

const stage = () => {
  if (release.kind === "prerelease") return " This is a pre-release.";
  return "";
};

// The Releases page: the current release and its files, kept off the home
// page and out of the footer.
const Releases = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Strip links={links} />
    <Nav links={nav.links} />
    <main className="frame-prose" id="main">
      <Section
        eyebrow="Releases"
        heading={`${release.version} is out.`}
        lede={`Published ${release.publishedOn}.${stage()}${
          isPreOne(release.version)
            ? " Until v1.0.0, any release may change fundamentally."
            : ""
        }`}
        level={1}
      >
        <Downloads
          assets={downloads}
          pageHref={release.pageHref}
          version={release.version}
        />
      </Section>
    </main>
    <Footer
      groups={footer.groups}
      marks={footer.marks}
      tagline={footer.tagline}
    />
  </>
);

export default Releases;
