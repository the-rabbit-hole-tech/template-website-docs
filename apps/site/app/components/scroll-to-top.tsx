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
