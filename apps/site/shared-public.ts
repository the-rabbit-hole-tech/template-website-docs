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
import type { Plugin } from "vite";

import { cpSync, existsSync, readFileSync, statSync } from "node:fs";
import nodePath from "node:path";

const TYPES: Record<string, string> = {
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

// Extra public folders: Vite serves only one publicDir, and the site's static
// files live in the shared packages. The dev server answers for them as if
// they were in public/, and the client build copies them to its output root,
// the same place Vite copies public/.
export const sharedPublic = (directories: string[]): Plugin => {
  let base = "/";
  return {
    configResolved(config) {
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = decodeURIComponent((request.url ?? "").split("?", 1)[0]);
        if (!path.startsWith(base)) return next();
        const relativePath = nodePath.normalize(path.slice(base.length));
        if (
          relativePath.startsWith("..") ||
          relativePath.includes(`${nodePath.sep}..`)
        )
          return next();
        for (const directory of directories) {
          const file = nodePath.join(directory, relativePath);
          if (existsSync(file) && statSync(file).isFile()) {
            response.setHeader(
              "Content-Type",
              TYPES[nodePath.extname(file)] ?? "application/octet-stream",
            );
            response.end(readFileSync(file));
            return;
          }
        }
        next();
      });
    },
    name: "shared-public",
    writeBundle(options) {
      if (this.environment.name !== "client" || !options.dir) return;
      for (const directory of directories) {
        cpSync(directory, options.dir, { recursive: true });
        this.environment.logger.info(`copied ${directory} into ${options.dir}`);
      }
    },
  };
};
