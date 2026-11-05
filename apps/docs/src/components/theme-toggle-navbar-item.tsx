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

import { useColorMode } from "@docusaurus/theme-common";
import { type FrameTheme, pressThemeSwitch } from "@product/frame/theme-pref";
import { ThemeToggle } from "@product/frame/theme-toggle";
import { useBrowserConsent } from "@product/frame/use-consent";
import { DOCS_CONSENT_PREFIX } from "@site/src/lib/consent";

// setColorMode takes a second argument its type leaves out: {persist: false}
// sets the colour mode without Docusaurus writing it to storage.
type SetColorMode = (mode: FrameTheme, options: { persist: boolean }) => void;

// The light and dark switch from packages/frame, the same button the site
// shows at the same spot, driven by Docusaurus's colour mode, which follows
// the system setting until the visitor picks a theme. Docusaurus never
// stores it; the pick goes to the consent store, which remembers it only
// after the visitor accepts (packages/frame theme-pref.ts). The phone menu repeats
// the header's items; the switch stays in the header there, so it renders
// nothing in the menu.
export const ThemeToggleNavbarItem = ({
  mobile,
}: {
  mobile?: boolean;
}): ReactNode => {
  const { colorMode, setColorMode } = useColorMode();
  const { consent } = useBrowserConsent(DOCS_CONSENT_PREFIX);
  if (mobile) return null;
  // Before the visitor answers the cookie choice a press only opens the
  // cookie bar; after that it flips the theme (stored only if they accepted).
  const press = () => {
    if (!consent) return;
    const next = pressThemeSwitch(consent, colorMode);
    if (next) (setColorMode as SetColorMode)(next, { persist: false });
  };
  return (
    <div className="navbar__item navbar__theme">
      <ThemeToggle onToggle={press} theme={colorMode} />
    </div>
  );
};
