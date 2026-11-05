# Docs 📚

> 📖 The {{PRODUCT}} documentation site, {{DOCS_DOMAIN}}: Docusaurus 3, versioned, on the shared frame

Docusaurus 3 and TypeScript, one app in this repo's npm workspaces. Run the commands below from
the repo root; see the root [README](../../README.md) for the rest.

```bash
npm run dev:docs                    # http://localhost:3000, vNext included
npm run build -w @product/docs      # the static site in apps/docs/build
npm run typecheck -w @product/docs
```

## ✨ What is where

- 📝 **`docs/`:** vNext, the pages for unreleased `main`, served at `/docs/vnext/` under a banner
  naming the upcoming and current release (`src/theme/DocVersionBanner`, from
  `packages/frame/release.ts`). The sidebar is `sidebars.ts`.
- 🗂️ **Snapshots:** `versioned_docs/`, `versioned_sidebars/` and `versions.json`, one snapshot per
  released version, cut by `npm run docs:version` from the root. The newest is the default, at
  `/docs/`. A snapshot changes only to match what its release ships.
- ↪️ **`redirects.ts`:** when a page or a section moves, add it to `DOCS_MOVES` and the old path
  keeps answering, in every version, through `@docusaurus/plugin-client-redirects`.
- 🏠 **`src/pages/index.tsx`:** the docs home, a card for each top-level section.
- 🎨 **`src/css/theme.css`:** the page theme, the `--docs-*` tokens mapped onto Docusaurus's Infima
  variables. Page-level tweaks go in `src/css/custom.css`.
- 🧭 **Header, strip and footer:** the product site's, from `packages/frame`: the links, footer
  and strip markup in `content.ts` and `strip.ts`, the measurements and colours in
  `site-frame.css`, mapped onto Docusaurus's classes in `src/css/custom.css`. The theme switch and
  the header menu are the shared ones (`src/components/theme-toggle-navbar-item.tsx`,
  `src/components/header-menu-navbar-item.tsx`). `scripts/site-frame.test.mjs` checks the docs
  load the frame the way the site does.
- 🧰 **Doc toolbar:** at the right end of the breadcrumb line (`src/theme/DocBreadcrumbs`,
  `src/components/doc-toolbar.tsx`): the version picker, and a switch that widens the content
  column to the window (the frame stays put; off by default, shown only above the frame width). A
  trail too long for the line folds its oldest crumbs into one item (`src/lib/breadcrumb-fold.ts`).
- 🍪 **Consent first:** the theme and the content width are remembered on the machine only after
  the visitor accepts the cookie choice, which shows the first time they use either switch
  (`src/theme/Root.tsx`). Until then the theme follows the system setting, the theme switch only
  opens the cookie bar, and nothing is written to browser storage: Docusaurus's own switch,
  announcement bar (`src/theme/AnnouncementBar` draws the strip instead), version memory and tab
  memory (`src/theme/Tabs`) are kept out of storage. `npm run check:storage:docs` checks a build.
- 🏷️ **Plain navigation:** the sidebar and the table of contents show titles and
  headings without their emoji (`src/theme/DocSidebarItems`, `src/theme/TOCItems`); the pages
  keep them.

## 🧭 Conventions

- ✅ **A version holds what it ships:** a released version describes only what that release
  ships; anything else lives in vNext.
- 📖 **Docs describe shipped code**, not design intent: a released version describes that
  release's code at its tag, and vNext describes `main`.
- ♿ **Contrast:** body text, links, callouts, tabs, tables, code tokens and the sidebar meet WCAG
  AA in both modes. Check any new colour against its real background before adding it.
- 🔗 **Links:** a broken internal link fails the build, in vNext and in every released version.
- 🏷️ **MDX 3:** no explicit `{#id}` heading anchors; rely on the generated slugs.
