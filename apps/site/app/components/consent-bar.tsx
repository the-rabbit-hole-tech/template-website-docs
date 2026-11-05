// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import { ConsentBanner } from "@product/frame/consent-banner";
import { useBrowserConsent } from "@product/frame/use-consent";

import { SITE_CONSENT_PREFIX } from "~/theme";

// The shared cookie choice (packages/frame). It shows only once a visitor
// presses the theme switch without having answered yet.
export const ConsentBar = () => {
  const { asking, consent } = useBrowserConsent(SITE_CONSENT_PREFIX);
  if (!consent || !asking) return null;
  return (
    <ConsentBanner onAccept={consent.accept} onDecline={consent.decline} />
  );
};
