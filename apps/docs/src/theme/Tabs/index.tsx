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
import type { WrapperProps } from "@docusaurus/types";
import type TabsType from "@theme/Tabs";
import type { ReactNode } from "react";

import { useBrowserConsent } from "@product/frame/use-consent";
import { DOCS_CONSENT_PREFIX } from "@site/src/lib/consent";
import { tabsWithoutStorage } from "@site/src/lib/tabs-storage";
import TabsOriginal from "@theme-original/Tabs";

type Properties = WrapperProps<typeof TabsType>;

// Tab groups remember their choice only after the visitor accepts the cookie
// choice (src/lib/tabs-storage.ts). Picking a tab doesn't ask; only the
// theme and full-width switches do.
export default function Tabs(properties: Properties): ReactNode {
  const { state } = useBrowserConsent(DOCS_CONSENT_PREFIX);
  return (
    <TabsOriginal {...tabsWithoutStorage(properties, state === "accepted")} />
  );
}
