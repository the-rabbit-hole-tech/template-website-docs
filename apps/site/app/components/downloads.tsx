// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import type { DownloadAsset } from "~/content/release";

import "./marketing.css";

interface DownloadsProperties {
  assets: ({ href: string } & DownloadAsset)[];
  pageHref: string;
  version: string;
}

// The Releases page's body: the release's files when it ships any, and the
// link to its full release page. The content comes from app/content/release.ts.
export const Downloads = ({
  assets,
  pageHref,
  version,
}: DownloadsProperties) => (
  <div className="downloads">
    {assets.length > 0 ? (
      <>
        <h2 className="downloads__heading">Download</h2>
        <table className="downloads-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.name}>
                <td>
                  <a href={asset.href}>
                    <code>{asset.name}</code>
                  </a>
                  <div className="downloads-table__note">{asset.label}</div>
                </td>
                <td className="downloads-table__size">{asset.sizeLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ) : null}
    <p className="prose">
      The notes and every file are on the {version}{" "}
      <a href={pageHref}>release page</a>.
    </p>
  </div>
);
