// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
