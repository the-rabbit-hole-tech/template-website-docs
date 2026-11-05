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
// Fails unless the docs have a version cut for the product's current release
// (packages/frame/release.ts), as the newest one. The deploy
// workflow runs it before building either site, so a release can't go out
// with docs that are missing its version.
import { docsVersionProblem, readState } from "./docs-version.mjs";

let failed = false;
for (const { name, version, versions } of readState()) {
  console.log(
    `${name}: release ${version}; docs versions: ${versions.join(", ") || "none"}`,
  );
  const problem = docsVersionProblem(version, versions, name);
  if (problem) {
    console.error(`docs version check failed: ${problem}`);
    failed = true;
  } else {
    console.log(
      `docs version check passed: ${version} is the default ${name} version`,
    );
  }
}
if (failed) process.exit(1);
