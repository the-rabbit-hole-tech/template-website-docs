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
// Which apps a change touches, so CI builds only those. A change under
// apps/site or apps/docs builds that app; anything else (the shared
// packages, the root manifests, the workflows, these scripts) builds both,
// since both apps depend on it. Docs-only files at the root (README and the
// like) build neither.
//
//   node scripts/changed-apps.mjs <base> <head>
//
// prints site_changed=<bool> and docs_changed=<bool> lines for $GITHUB_OUTPUT. With no base
// (a push, a merge group), it builds both.
import { execFileSync } from "node:child_process";

const ROOT_DOCS =
  /^(README|AGENTS|CLAUDE|TEMPLATE)\.md$|^(LICENSE|NOTICE|AUTHORS)$|^docs\/[^/]+\.md$/;

export const changedApps = (files) => {
  let siteChanged = false;
  let docsChanged = false;
  for (const file of files) {
    if (file.startsWith("apps/site/")) siteChanged = true;
    else if (file.startsWith("apps/docs/")) docsChanged = true;
    else if (!ROOT_DOCS.test(file)) {
      siteChanged = true;
      docsChanged = true;
    }
  }
  return { docsChanged, siteChanged };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [base, head] = process.argv.slice(2);
  let result = { docsChanged: true, siteChanged: true };
  if (base && head) {
    const files = execFileSync(
      "git",
      ["diff", "--name-only", `${base}...${head}`],
      {
        encoding: "utf8",
      },
    )
      .split("\n")
      .filter(Boolean);
    console.error(
      `${files.length} changed file(s) between ${base} and ${head}`,
    );
    result = changedApps(files);
  } else {
    console.error("no base to compare with: building both apps");
  }
  console.log(`site_changed=${result.siteChanged}`);
  console.log(`docs_changed=${result.docsChanged}`);
}
