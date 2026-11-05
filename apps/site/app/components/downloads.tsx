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
