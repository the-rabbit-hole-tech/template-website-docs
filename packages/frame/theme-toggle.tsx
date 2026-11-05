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
// The light and dark switch both sites put at the right end of the header,
// drawn with plain classes from site-frame.css so the site and the docs
// render the same button. Each site owns the state on its page (the site's
// <html>, the docs' Docusaurus colour mode); remembering it waits for consent
// (theme-pref.ts).

import { type FrameTheme, themeToggleLabel } from "./theme-pref.ts";

export type { FrameTheme } from "./theme-pref.ts";

const iconProperties = {
  "aria-hidden": true,
  fill: "none",
  height: 16,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.75,
  viewBox: "0 0 24 24",
  width: 16,
} as const;

// A sun and a moon. Both are rendered and site-frame.css shows the one for the theme on <html> (data-theme), so the
// right icon is there before React hydrates a prerendered page.
const Sun = () => (
  <svg
    {...iconProperties}
    className="theme-toggle__icon theme-toggle__icon--sun"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.9 4.9l1.4 1.4" />
    <path d="M17.7 17.7l1.4 1.4" />
    <path d="M4.9 19.1l1.4-1.4" />
    <path d="M17.7 6.3l1.4-1.4" />
  </svg>
);

const Moon = () => (
  <svg
    {...iconProperties}
    className="theme-toggle__icon theme-toggle__icon--moon"
  >
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
);

export const ThemeToggle = ({
  onToggle,
  theme,
}: {
  onToggle: () => void;
  theme: FrameTheme;
}) => {
  const label = themeToggleLabel(theme);
  return (
    <button
      aria-label={label}
      className="theme-toggle"
      onClick={onToggle}
      title={label}
      type="button"
    >
      <Sun />
      <Moon />
    </button>
  );
};
