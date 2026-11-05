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
// Takes emoji out of a label or heading, for navigation that reads as plain
// text (the docs sidebar and table of contents) while the page itself keeps
// them. Only what renders as emoji goes: characters that default to emoji
// presentation, or any pictograph forced to it with U+FE0F, along with their
// skin-tone modifiers and joined sequences. Text symbols such as the trademark,
// copyright and registered signs, and arrows, stay.
const EMOJI =
  /(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F})(?:\p{Emoji_Modifier}|\u{FE0F}|\u{200D}(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F}?))*\s*/gu;

export const stripEmoji = (text: string): string => {
  return text
    .replaceAll(EMOJI, "")
    .replaceAll(/\s{2,}/g, " ")
    .trim();
};
