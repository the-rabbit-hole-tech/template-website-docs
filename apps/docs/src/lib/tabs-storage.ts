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
// Docusaurus's Tabs remember a tab group's choice (groupId) in browser
// storage. Before the visitor accepts the cookie choice, a group keeps its
// choice in the URL instead (queryString, named after the group), so tab
// groups on a page still switch together and nothing is stored. After they
// accept, the props pass through unchanged.
type TabsStorageProperties = {
  groupId?: string;
  queryString?: boolean | string;
};

export const tabsWithoutStorage = <P extends TabsStorageProperties>(
  properties: P,
  accepted: boolean,
): P => {
  if (accepted || !properties.groupId) return properties;
  const queryString =
    typeof properties.queryString === "string"
      ? properties.queryString
      : properties.groupId;
  return { ...properties, groupId: undefined, queryString };
};
