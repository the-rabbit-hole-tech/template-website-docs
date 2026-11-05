// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import { useEffect } from "react";
import { useLocation } from "react-router";

// Moving to another page starts at its top, or at its #section. This stands
// in for React Router's ScrollRestoration, which writes scroll positions to
// sessionStorage before any cookie choice; the browser still restores the
// position on back, forward and reload by itself.
export const ScrollToTop = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash)
      document
        .querySelector(`#${CSS.escape(decodeURIComponent(hash.slice(1)))}`)
        ?.scrollIntoView();
    else globalThis.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};
