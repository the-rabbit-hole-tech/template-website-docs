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
import type { ReactNode } from "react";

import { useActivePlugin } from "@docusaurus/plugin-content-docs/client";
import { isFullWidth, setFullWidth } from "@product/frame/full-width";
import { FullWidthToggle } from "@product/frame/full-width-toggle";
import { useBrowserConsent } from "@product/frame/use-consent";
import { DocsVersionNavbarItem } from "@site/src/components/docs-version-navbar-item";
import { DOCS_CONSENT_PREFIX } from "@site/src/lib/consent";

// The doc toolbar, at the top right of the doc column on the breadcrumb
// line (src/theme/DocBreadcrumbs): the version picker and the full-width
// switch from packages/frame. Keeping them out of the header
// leaves the header the site's, item for item, at every width. On a narrow
// screen the toolbar wraps under the breadcrumbs. The switch reads the
// stored choice only once the page has hydrated, so the first render
// matches the prerendered page.
export const DocToolbar = (): ReactNode => {
  const activePlugin = useActivePlugin();
  const { consent } = useBrowserConsent(DOCS_CONSENT_PREFIX);
  if (!activePlugin) return null;
  const full = consent ? isFullWidth(consent) : false;
  return (
    <div className="doc-toolbar">
      <DocsVersionNavbarItem
        className="doc-toolbar__version"
        docsPluginId={activePlugin.pluginId}
        dropdownActiveClassDisabled
        dropdownItemsAfter={[]}
        dropdownItemsBefore={[]}
        // The dropdown builds its own items from the versions.
        items={[]}
      />
      <div className="doc-toolbar__width">
        <FullWidthToggle
          full={full}
          onToggle={() =>
            consent && setFullWidth(consent, !full, document.documentElement)
          }
        />
      </div>
    </div>
  );
};
