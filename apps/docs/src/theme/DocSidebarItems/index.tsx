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
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import type { WrapperProps } from "@docusaurus/types";
import type DocSidebarItemsType from "@theme/DocSidebarItems";

import { stripEmoji } from "@product/frame/emoji";
import DocSidebarItemsOriginal from "@theme-original/DocSidebarItems";
import { memo, type ReactNode } from "react";

type Properties = WrapperProps<typeof DocSidebarItemsType>;

// The sidebar reads as plain text: page titles keep their emoji on the page
// itself, but the sidebar shows the labels without them.
const plain = (item: PropSidebarItem): PropSidebarItem => {
  if (item.type === "html") return item;
  if (item.type === "category")
    return {
      ...item,
      items: item.items.map(plain),
      label: stripEmoji(item.label),
    };
  return { ...item, label: stripEmoji(item.label) };
};

const DocumentSidebarItems = ({
  items,
  ...properties
}: Properties): ReactNode => {
  return (
    <DocSidebarItemsOriginal
      items={items.map((item) => plain(item))}
      {...properties}
    />
  );
};

export default memo(DocumentSidebarItems);
