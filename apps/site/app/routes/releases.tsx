// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
