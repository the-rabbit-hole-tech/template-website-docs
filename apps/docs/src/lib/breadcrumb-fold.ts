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
// How the breadcrumb line (src/theme/DocBreadcrumbs) folds a trail that
// doesn't fit beside the doc toolbar: the crumbs above the current page go,
// oldest first, into one "…" item whose title names them, so the page keeps
// its full name whenever it fits. Once every other crumb has folded, the
// page's own name ends in an ellipsis (CSS) instead.

export const FOLD_MARK = "…";
export const TRAIL_SEPARATOR = " › ";

export const foldedTitle = (labels: string[], folded: number): string => {
  return labels.slice(0, folded).join(TRAIL_SEPARATOR);
};

// The fold count after one measure: one more while the trail overflows or the
// page's name is cut, never folding the current page itself.
export const nextFold = ({
  count,
  cut,
  folded,
  overflows,
}: {
  count: number;
  cut: boolean;
  folded: number;
  overflows: boolean;
}): number => {
  if (folded >= count - 1) return folded;
  return overflows || cut ? folded + 1 : folded;
};

// The crumbs to draw: the "…" item (index -1) for the folded ones, then
// the rest with their index in the full trail.
export const visibleCrumbs = (
  labels: string[],
  folded: number,
): { index: number; label: string }[] => {
  const rest = labels
    .slice(folded)
    .map((label, offset) => ({ index: folded + offset, label }));
  return folded > 0 ? [{ index: -1, label: FOLD_MARK }, ...rest] : rest;
};
