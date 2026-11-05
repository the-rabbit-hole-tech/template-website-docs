// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
import "./marketing.css";

interface FeatureGridProperties {
  items: FeatureItem[];
}

interface FeatureItem {
  body: string;
  title: string;
}

// A responsive grid of feature cards.
export const FeatureGrid = ({ items }: FeatureGridProperties) => (
  <ul className="feature-grid">
    {items.map((item) => (
      <li className="feature-card" key={item.title}>
        <h3 className="feature-card__title">{item.title}</h3>
        <p className="feature-card__body">{item.body}</p>
      </li>
    ))}
  </ul>
);
