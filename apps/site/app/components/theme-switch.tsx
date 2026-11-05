// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
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
