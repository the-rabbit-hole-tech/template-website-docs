// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import type { ReactNode } from "react";

import { fontFaceCss, fontUrl, PRELOAD_FONTS } from "@product/frame/fonts";
import { Links, Meta, Outlet, Scripts } from "react-router";

import { ConsentBar } from "./components/consent-bar";
import { ScrollToTop } from "./components/scroll-to-top";
import { themeInitScript } from "./theme";

import "@product/frame/site-frame.css";

import "./app.css";

const base = import.meta.env.BASE_URL;

// Self-hosted font faces (packages/frame fonts.ts), written with the base path
// so a sub-path build still finds /fonts/ under it. Empty until a product
// adds a font.
const fontFaces = fontFaceCss(base);

export const Layout = ({ children }: { children: ReactNode }) => (
  // The head script sets data-theme before React hydrates (the system
  // setting, or the visitor's own choice once they have accepted the cookie
  // choice), so <html> differs from the prerendered markup on purpose.
  <html lang="en" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8" />
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="light dark" name="color-scheme" />
      <link href={`${base}favicon.svg`} rel="icon" type="image/svg+xml" />
      <link href={`${base}apple-touch-icon.png`} rel="apple-touch-icon" />
      {fontFaces ? (
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
      ) : null}
      {PRELOAD_FONTS.map((font) => (
        <link
          as="font"
          crossOrigin="anonymous"
          href={fontUrl(base, font)}
          key={font}
          rel="preload"
          type="font/woff2"
        />
      ))}
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ConsentBar />
      <ScrollToTop />
      <Scripts />
    </body>
  </html>
);

const Root = () => <Outlet />;

export default Root;
