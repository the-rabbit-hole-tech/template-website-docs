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
import { pressThemeSwitch, rememberedTheme } from "@product/frame/theme-pref";
import { type FrameTheme, ThemeToggle } from "@product/frame/theme-toggle";
import { useBrowserConsent } from "@product/frame/use-consent";
import { useEffect, useSyncExternalStore } from "react";

import { applyTheme, pageTheme, SITE_CONSENT_PREFIX } from "~/theme";

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getTheme = (): FrameTheme =>
  pageTheme(document.documentElement.dataset.theme);
const getServerTheme = (): FrameTheme => "light";

const show = (theme: FrameTheme) => {
  applyTheme(document.documentElement, theme);
  for (const listener of listeners) listener();
};

// The shared switch (packages/frame), wired to the site's theme on <html>.
// Before the visitor answers the cookie choice a press only opens the cookie
// bar; after that it flips the theme (stored only if they accepted). Until
// the visitor picks a theme of their own, the page follows the system
// setting, live.
export const ThemeSwitch = () => {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const { consent } = useBrowserConsent(SITE_CONSENT_PREFIX);

  useEffect(() => {
    if (!consent) return;
    const query = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      if (rememberedTheme(consent) === null)
        show(query.matches ? "dark" : "light");
    };
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, [consent]);

  const press = () => {
    if (!consent) return;
    const next = pressThemeSwitch(consent, theme);
    if (next) show(next);
  };
  return <ThemeToggle onToggle={press} theme={theme} />;
};
