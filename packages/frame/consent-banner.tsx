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
import type { ReactNode } from "react";

// The cookie choice, in the frame's style: a small bar at the bottom of the
// page with Accept and Decline. It shows only when a site's consent store is
// asking (a visitor used a setting's switch before answering), so readers
// who never touch one never see it. Plain classes from site-frame.css, no
// framework beyond React.

export const ConsentBanner = ({
  children,
  onAccept,
  onDecline,
}: {
  children?: ReactNode;
  onAccept: () => void;
  onDecline: () => void;
}) => (
  <div aria-label="Cookie choice" className="frame-consent" role="region">
    <p className="frame-consent__text">
      {children ?? (
        <>
          Can this site remember your settings, such as the theme, on this
          device? They&apos;re kept in your browser&apos;s storage and used for
          nothing else: no tracking, no analytics.
        </>
      )}
    </p>
    <div className="frame-consent__actions">
      <button
        className="frame-consent__button"
        onClick={onDecline}
        type="button"
      >
        Decline
      </button>
      <button
        className="frame-consent__button frame-consent__button--primary"
        onClick={onAccept}
        type="button"
      >
        Accept
      </button>
    </div>
  </div>
);
