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
import type { FrameLink } from "@product/frame/content";
import type { ReactNode } from "react";

import { HeaderMenu } from "@product/frame/header-menu";

// The shared menu button from packages/frame, the same one the site shows
// after its theme switch: under the frame's breakpoint it holds the header
// links. It isn't a navbar__item, so Infima's phone rules don't hide it, and
// it renders nothing in Docusaurus's own phone menu.
export const HeaderMenuNavbarItem = ({
  links,
  mobile,
}: {
  links: FrameLink[];
  mobile?: boolean;
}): ReactNode => {
  if (mobile) return null;
  return <HeaderMenu links={links} />;
};
