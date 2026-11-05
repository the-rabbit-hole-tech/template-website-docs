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
// Cuts the docs version for the current release: snapshots vNext
// (apps/docs/docs) under the version in packages/frame/release.ts. Run it
// in the release's own PR, after the version bump, and commit what it writes.
import { execFileSync } from "node:child_process";

import { readState } from "./docs-version.mjs";

for (const {
  cutCommand,
  name,
  version,
  versions,
  versionsFile,
} of readState()) {
  if (versions.includes(version)) {
    console.log(
      `${name} docs version ${version} is already cut; nothing to do`,
    );
    continue;
  }
  console.log(
    `cutting ${name} docs version ${version} (existing: ${versions.join(", ") || "none"})`,
  );
  execFileSync("npx", ["docusaurus", cutCommand, version], {
    cwd: new URL("../apps/docs/", import.meta.url),
    stdio: "inherit",
  });
  console.log(
    `cut ${name} docs version ${version}: commit apps/docs/${versionsFile} and its snapshot`,
  );
}
