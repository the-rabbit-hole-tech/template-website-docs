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
// The width under which both headers fold their links into the menu button
// (header-menu.tsx). Measured with every header link present, on the site
// home, the docs home and doc pages (the docs version picker lives in the
// doc toolbar, not the header): from 1050px up the links keep their
// full-width spacing and stay at least one nav gap (32px) clear of the
// wordmark; they would touch it at about 1016px.
// site-frame.css holds the one media rule at this width; frame.test.ts keeps
// the two in step.
export const HEADER_MENU_BREAKPOINT = 1050;
export const HEADER_MENU_MAX_WIDTH = HEADER_MENU_BREAKPOINT - 1;

// The class each site puts on its header links, which the media rule hides.
export const NAV_LINK_CLASS = "frame-nav__link";

export type MenuEvent = "escape" | "link" | "outside" | "toggle";

export const nextMenuState = (open: boolean, event: MenuEvent): boolean =>
  event === "toggle" ? !open : false;
