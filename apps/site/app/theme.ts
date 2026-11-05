// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
