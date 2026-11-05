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
import type { WrapperProps } from "@docusaurus/types";
import type TOCItemsType from "@theme/TOCItems";
import type { ReactNode } from "react";

import { stripEmoji } from "@product/frame/emoji";
import TOCItemsOriginal from "@theme-original/TOCItems";

type Properties = WrapperProps<typeof TOCItemsType>;

// The table of contents beside a page (and its collapsed form on phones)
// lists the headings without their emoji; the headings keep them.
export default function TOCItems({
  toc,
  ...properties
}: Properties): ReactNode {
  return (
    <TOCItemsOriginal
      toc={toc.map((item) => ({ ...item, value: stripEmoji(item.value) }))}
      {...properties}
    />
  );
}
