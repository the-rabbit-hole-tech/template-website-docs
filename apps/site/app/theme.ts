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
// The site's light and dark theme. Before the visitor answers the cookie
// choice, and after they decline, the site follows the system setting
// (prefers-color-scheme) and stores nothing; the switch only works once
// they've answered (packages/frame theme-pref.ts and consent.ts, under
// SITE_CONSENT_PREFIX). The theme lands on <html> as data-theme, which
// app.css and site-frame.css read, the same attribute the docs set.
import { SITE_CONSENT_PREFIX } from "@product/frame/product";
import { type FrameTheme, themeBootScript } from "@product/frame/theme-pref";

export { SITE_CONSENT_PREFIX } from "@product/frame/product";

export const pageTheme = (value: null | string | undefined): FrameTheme =>
  value === "dark" ? "dark" : "light";

interface ThemeRoot {
  dataset: { theme?: string };
  style: { colorScheme: string };
}

export const applyTheme = (root: ThemeRoot, theme: FrameTheme) => {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
};

// Runs in <head> before the page paints: the visitor's stored choice once
// they've accepted, otherwise the system setting. It only reads storage.
export const themeInitScript = themeBootScript(SITE_CONSENT_PREFIX);
