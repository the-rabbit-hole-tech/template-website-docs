# CLAUDE.md - template-website-docs

Working agreement for this repository. `AGENTS.md` has the build, test and lint commands;
`TEMPLATE.md` says how a product uses the template.

## Conventions

- Branching: never commit to `main`. Branch as `<type>/<issue#>-<slug>` and open a PR; PRs merge
  by squash.
- Commits, issue titles and PR titles: Conventional Commits (`type(scope): description`). No
  attribution trailers, no emoji in source or commit messages (emoji are fine in Markdown docs and
  workflow files).
- Open every PR as a draft. CI skips drafts, so run the checks locally, push once they pass, and
  mark the PR ready when the work is finished.
- GitHub Actions: a job id must be a plain identifier (a letter or `_`, then alphanumerics/`-`/`_`);
  put emoji and display text in the job's `name:`. The Actionlint check
  (`.github/workflows/action-lint.yaml`) enforces this.
- Every product value stays a placeholder in this repo. Never commit a real product's name, brand,
  colours, copy or domains here.

## Project layout

This repo is an npm workspaces monorepo holding two static sites and the packages they share, as
a template the rabbit hole's products start from.

Both sites are static: the product site is React Router v7 in framework mode, prerendered at
build time (`ssr: false`, `prerender()`), and the docs are Docusaurus 3. Neither has a server at
request time. Every product value is a placeholder until `scripts/init-product.mjs` fills it
(TEMPLATE.md).

### Tree

```text
.
├── apps/
│   ├── site/                    @product/site: the product site
│   │   ├── app/
│   │   │   ├── root.tsx         the document shell: <html>, head scripts, the cookie bar
│   │   │   ├── routes.ts        the routes, from site-mode.ts
│   │   │   ├── site-mode.ts     which pages a build holds (full or coming soon)
│   │   │   ├── theme.ts         the theme on <html>, consent first
│   │   │   ├── routes/          home, releases, coming-soon
│   │   │   ├── content/         every word the pages show, and the page meta
│   │   │   ├── components/      nav, footer, strip, section, switches; marketing.css
│   │   │   └── lib/             framework-free helpers
│   │   ├── scripts/             check-links.mjs, check-release-build.ts
│   │   ├── react-router.config.ts
│   │   └── vite.config.ts       serves packages/frame and packages/brand public/
│   └── docs/                    @product/docs: the docs site
│       ├── docs/                vNext, the pages for unreleased main
│       ├── versioned_docs/      one snapshot per release, with versioned_sidebars/
│       ├── versions.json        the cut versions, newest (the default) first
│       ├── sidebars.ts
│       ├── redirects.ts         old paths for moved pages
│       ├── docusaurus.config.ts
│       ├── scripts/             the frame-match test
│       └── src/
│           ├── theme/           swizzled components (Root, NavbarItem, DocBreadcrumbs, ...)
│           ├── components/      the navbar items and the doc toolbar
│           ├── lib/             framework-free helpers and their tests
│           ├── pages/           the docs home
│           └── css/             theme.css (--docs-* tokens), custom.css
├── packages/
│   ├── frame/                   @product/frame: product.ts, site-frame.css, the strip,
│   │                            header menu, footer content, release, consent and switches
│   └── brand/                   @product/brand: the mark, favicon, touch icon, share card
├── scripts/                     init-product, the docs version cut and check, and the
│                                storage, image and font checks
├── docs/deploy.md               how a release deploys
├── TEMPLATE.md                  what a product fills in, and how it takes later fixes
├── .oxlintrc.json               oxlint, extending @bugs5382/node-oxlint-config
├── oxfmt.config.ts
├── package.json                 the workspaces and the root scripts
└── Taskfile.yml
```

### What goes where

- `packages/frame/product.ts`: the only place code reads the product's name, slug, addresses,
  tagline and copyright holder.
- `packages/frame/`: anything both sites draw or decide the same way. A change here changes both
  sites; `frame.test.ts` and `apps/docs/scripts/site-frame.test.mjs` keep them matched.
- `apps/site/app/content/`: every string the site shows, so copy changes never touch markup, and
  `check-release-build.ts` can tell the landing page's words from the coming-soon page's.
- `apps/docs/docs/`: vNext only. A released version's pages change only to match what it ships.
- `scripts/`: repo tooling run by npm scripts and CI, each with a `node --test` file beside it.
- Every workspace is private; nothing here is published to npm.

### Naming

- Folders and files: `kebab-case`, the same names the product sites use, except Docusaurus's
  swizzled components under `apps/docs/src/theme/`, which keep Docusaurus's names.
- Types and components are `PascalCase`; functions and variables `camelCase`; arrow functions
  and named exports, except where React Router or Docusaurus load a default export.
- Workspaces are `@product/<name>`; the scope stays the same in every product.

### Tests, fixtures and generated code

- Unit tests sit next to the module as `<module>.test.ts` (or `.test.mjs` for scripts) and run
  with `node --test`, TypeScript through Node's type stripping.
- The fixture product is `FIXTURE` in `scripts/init-product.mjs`; CI fills the tree with it
  before the checks.
- `build/`, `build-sub-path/`, `.docusaurus/` and `.react-router/` are generated and gitignored.

## Gotchas

- Docusaurus MDX 3: avoid the `## Heading {#custom-id}` explicit-id syntax (it fails to compile);
  rely on the auto-generated slugs.
- Nothing may write browser storage before consent; see `AGENTS.md`.
