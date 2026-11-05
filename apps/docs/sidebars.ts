// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// The docs sidebar. Order here is the sidebar order; ids are file paths under
// docs/ minus ".md". A product replaces the placeholder pages with its own
// sections (TEMPLATE.md).
const sidebars: SidebarsConfig = {
  docs: [
    {
      collapsed: false,
      items: ["intro", "getting-started", "status"],
      label: "Introduction",
      type: "category",
    },
  ],
};

export default sidebars;
