// Copyright 2026 The template-website-docs Authors
// SPDX-License-Identifier: Apache-2.0
// The light mark and the dark one (packages/brand, the same files the docs
// use); site-frame.css shows the one for the theme on <html>.
export const Mark = ({
  className,
  size,
}: {
  className: string;
  size: number;
}) => {
  const base = import.meta.env.BASE_URL;
  return (
    <>
      <img
        alt=""
        className={`${className} mark--light`}
        height={size}
        src={`${base}img/brand/mark-light.svg`}
        width={size}
      />
      <img
        alt=""
        className={`${className} mark--dark`}
        height={size}
        src={`${base}img/brand/mark-dark.svg`}
        width={size}
      />
    </>
  );
};
