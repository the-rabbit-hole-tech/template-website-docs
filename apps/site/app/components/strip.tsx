// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import { type FrameLinks, stripHtml } from "@product/frame/strip";

import "./marketing.css";

// The strip above the header: the release and pre-1.0 note from
// packages/frame, the same markup the docs pass to their announcement bar,
// so the two sites draw it identically.
export const Strip = ({ links }: { links: FrameLinks }) => (
  <div
    aria-label="Release status"
    className="strip"
    dangerouslySetInnerHTML={{ __html: stripHtml(links) }}
    role="note"
  />
);
