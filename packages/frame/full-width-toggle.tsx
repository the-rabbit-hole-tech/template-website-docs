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
import { widthToggleText } from "./full-width.ts";

// The full-width content switch for a docs header (full-width.ts): a
// button in the nav type, beside the version picker, labelled with what
// pressing it does.
// Drawn with plain classes from site-frame.css.

const iconProperties = {
  "aria-hidden": true,
  fill: "none",
  height: 16,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.75,
  viewBox: "0 0 24 24",
  width: 16,
} as const;

// Arrows out to the sides (widen) and in from them (narrow).
const Widen = () => (
  <svg {...iconProperties} className="width-toggle__icon">
    <path d="M3 12h7M3 12l3-3M3 12l3 3" />
    <path d="M21 12h-7M21 12l-3-3M21 12l-3 3" />
  </svg>
);

const Narrow = () => (
  <svg {...iconProperties} className="width-toggle__icon">
    <path d="M10 12H3M10 12l-3-3M10 12l-3 3" />
    <path d="M14 12h7M14 12l3-3M14 12l3 3" />
  </svg>
);

export const FullWidthToggle = ({
  full,
  onToggle,
}: {
  full: boolean;
  onToggle: () => void;
}) => {
  const { label, other, title } = widthToggleText(full);
  return (
    <button
      className="width-toggle"
      data-full={full ? "true" : undefined}
      onClick={onToggle}
      title={title}
      type="button"
    >
      {full ? <Narrow /> : <Widen />}
      <span className="width-toggle__label">
        <span>{label}</span>
        <span aria-hidden="true" className="width-toggle__spacer">
          {other}
        </span>
      </span>
    </button>
  );
};
