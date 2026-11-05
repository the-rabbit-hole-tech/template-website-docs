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
import type { ComponentProps, ReactNode } from "react";

import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import DocsVersionDropdownNavbarItem from "@theme/NavbarItem/DocsVersionDropdownNavbarItem";

type Properties = ComponentProps<typeof DocsVersionDropdownNavbarItem>;

// The docs version dropdown for one docs instance, in the doc toolbar
// (doc-toolbar.tsx). Off a doc page it renders nothing. Used outside the
// navbar config, it skips the defaults the built-in 'docsVersionDropdown'
// type gets, so they're set here.
export const DocsVersionNavbarItem = ({
  dropdownItemsAfter = [],
  dropdownItemsBefore = [],
  ...properties
}: Properties): ReactNode => {
  const { activeVersion } = useActiveDocContext(properties.docsPluginId);
  if (!activeVersion) return null;
  return (
    <DocsVersionDropdownNavbarItem
      dropdownItemsAfter={dropdownItemsAfter}
      dropdownItemsBefore={dropdownItemsBefore}
      {...properties}
    />
  );
};
