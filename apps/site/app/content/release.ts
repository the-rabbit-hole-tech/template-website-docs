// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
