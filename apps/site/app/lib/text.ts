// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
// Splits the trailing word off a line of text so a caller can pair it with a
// trailing decorative mark (an emoji) inside a `white-space: nowrap` span,
// keeping the two from ever landing on separate lines.
export const splitTrailingWord = (
  text: string,
): [lead: string, tail: string] => {
  const trimmed = text.trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace === -1) return ["", trimmed];
  return [trimmed.slice(0, lastSpace + 1), trimmed.slice(lastSpace + 1)];
};
