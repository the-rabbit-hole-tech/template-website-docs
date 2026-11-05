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
// The Releases page's content: the current release (packages/frame
// release.ts) and its files. A new release is a change to the version in
// packages/frame/release.ts and, when it ships files, to `downloads` here.
import { githubUrl, product } from "@product/frame/product";
import { release as current } from "@product/frame/release";

// The repository that publishes the product's releases. The template assumes
// one named after the slug; change it when the releases live elsewhere.
export const RELEASES = `${githubUrl}/${product.slug}/releases`;

export const release = {
  ...current,
  pageHref: `${RELEASES}/tag/${current.version}`,
};

export interface DownloadAsset {
  label: string;
  name: string;
  sizeLabel: string;
}

// The release's files, attached to its GitHub Release. Empty in the template.
export const downloads: ({ href: string } & DownloadAsset)[] = (
  [] as DownloadAsset[]
).map((asset) => ({
  ...asset,
  href: `${RELEASES}/download/${release.version}/${asset.name}`,
}));
