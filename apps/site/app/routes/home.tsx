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

import { FeatureGrid } from "~/components/feature-grid";
import { Footer } from "~/components/footer";
import { Nav } from "~/components/nav";
import { Section } from "~/components/section";
import { Strip } from "~/components/strip";
import { features, homeMeta, intro } from "~/content/home";
import { pageMeta } from "~/content/meta";
import { footer, links, nav } from "~/content/site";

export const meta: MetaFunction = () =>
  pageMeta({ description: homeMeta.description, path: "/" });

// The landing page: the product's name and tagline with the two ways in (the
// docs and the releases), then what it does. A product adds its own sections
// below, each a <Section> with its copy in app/content/home.ts.
const Home = () => (
  <>
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Strip links={links} />
    <Nav links={nav.links} />
    <main className="frame-prose" id="main">
      <Section
        eyebrow={intro.eyebrow}
        heading={intro.heading}
        lede={intro.lede}
        level={1}
      >
        <p className="actions">
          <a className="button button--primary" href={`${links.docs}/docs/`}>
            {intro.primaryLabel}
          </a>
          <a className="button" href={links.releases}>
            {intro.secondaryLabel}
          </a>
        </p>
      </Section>

      <Section
        eyebrow={features.eyebrow}
        heading={features.heading}
        id="features"
        lede={features.lede}
        tone="card"
      >
        <FeatureGrid items={features.items} />
      </Section>
    </main>
    <Footer
      groups={footer.groups}
      marks={footer.marks}
      tagline={footer.tagline}
    />
  </>
);

export default Home;
