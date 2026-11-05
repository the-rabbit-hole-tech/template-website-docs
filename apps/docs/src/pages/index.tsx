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
import type { ReactNode } from "react";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { product } from "@product/frame/product";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

type EntryPoint = {
  description: string;
  label: string;
  to: string;
};

// The docs home: the product's name and tagline, then a card for each
// top-level section of the sidebar. A product replaces the placeholder cards
// with its own sections.
const entries: EntryPoint[] = [
  {
    description: `What ${product.name} is, who it's for, and where to start.`,
    label: "What it is",
    to: "/docs/",
  },
  {
    description: "Install it and take the first step.",
    label: "Getting started",
    to: "/docs/getting-started",
  },
  {
    description: "What works today and what comes next.",
    label: "Project status",
    to: "/docs/status",
  },
];

const Home = (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      description={`The ${product.name} documentation: ${product.tagline}`}
      title="Docs"
    >
      <main className="frame-prose">
        <header className={styles.intro}>
          <h1 className={styles.title}>{product.name} docs</h1>
          <p className={styles.tagline}>{product.tagline}</p>
        </header>
        <section aria-labelledby="docs-sections" className={styles.entryPoints}>
          <h2 className={styles.entryGroupTitle} id="docs-sections">
            Start here
          </h2>
          <div className={styles.entryGrid}>
            {entries.map((entry) => (
              <Link className={styles.entryCard} key={entry.to} to={entry.to}>
                <span className={styles.entryLabel}>{entry.label}</span>
                <span className={styles.entryDescription}>
                  {entry.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.productLink}>
          <p>
            Looking for the product overview rather than the documentation?{" "}
            <Link href={siteConfig.customFields?.siteUrl as string}>
              Visit {product.domain}
            </Link>
            .
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
