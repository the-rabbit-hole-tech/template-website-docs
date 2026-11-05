# AGENTS.md - template-website-docs

Guide for AI agents working in this repository. Pair with `CLAUDE.md` (the working agreement). Keep this file current when the build, layout, or public API changes.

## What this is

Starting point for a product website and versioned docs site: the shared frame, consent gate, checks and Cloudflare Pages deploy, with no brand.

A public GitHub template repo for every rabbit hole product. It holds the structure and wiring
the product sites share (the npm workspaces, the frame, the consent gate, the docs versioning,
the checks and the deploy) and nothing one product does its own way. Two things to understand
before changing it:

- **Every product value is a placeholder.** The double-brace tokens that TEMPLATE.md lists stay in
  the committed tree; `scripts/init-product.mjs` fills them in a product's clone. Never commit
  this repo filled in, and never put a real product's name, brand, colours, copy or domains here.
  Code reads the values from `packages/frame/product.ts` only.
- **CI proves the template filled in.** `checks.yml` runs `init-product.mjs --fixture` (the
  fictional Acme product on example.com addresses) before lint, tests and builds. To reproduce
  a CI run locally, fill a separate copy, not this checkout.

## Using template-website-docs

A product is created from this template on GitHub, then follows TEMPLATE.md: fill the
placeholders, replace the brand and tokens, write its copy and docs, set up the deploy. Fixes to
the shared parts land here first and go to each product as a cherry-picked PR (TEMPLATE.md,
"Taking later template fixes"). Keep file names and structure the same as the product sites, so
a fix moves file for file.

## Layout

- `apps/site/` - the product site, React Router v7 prerendered to static HTML: `app/routes/`
  (home, Releases, coming soon), `app/content/` (all copy and meta), `app/components/`,
  `app/site-mode.ts` (which pages a coming-soon build holds), `scripts/` (link and coming-soon
  build checks).
- `apps/docs/` - the docs site, Docusaurus 3: `docs/` (vNext), `versioned_docs/` and
  `versions.json`, `src/theme/` (swizzled components), `src/components/`, `src/lib/`,
  `redirects.ts`.
- `packages/frame/` - shared by both sites: `product.ts`, `site-frame.css`, `content.ts`,
  `strip.ts`, `release.ts`, the consent store and the switches.
- `packages/brand/` - the mark, favicon, touch icon and share card (placeholders).
- `scripts/` - `init-product.mjs`, the docs version cut and check, `changed-apps.mjs`, and the
  storage, image and font checks.
- `docs/deploy.md` - how a release deploys.

## Build, test, lint

- Install: `npm ci --ignore-scripts`
- Lint: `npm run lint` (oxlint, then `oxfmt --check`; `npm run lint:fix` and `npm run format`
  fix what they can)
- Test: `npm test` (every workspace's `node --test` suites and `scripts/*.test.mjs`; no services
  needed)
- Build and check, in a filled copy only: `npm run build`, `npm run typecheck`,
  `npm run check:links`, `npm run check:storage:site`, `npm run check:storage:docs`,
  `npm run check:images:docs`, `npm run check:docs-version`, and
  `npm run build:coming-soon -w @product/site`
- License headers: `task license` (check) and `task license:fix` (inject): the two-line SPDX
  Apache-2.0 header, "The template-website-docs Authors"

## Logging

- Log generously: entry and exit of significant operations, decisions and branches, retries, state
  changes, external calls (target, duration, outcome), and every error with its context.
- Levels: `trace` for step-by-step detail, `debug` for flow, `info` for lifecycle, `warn` and
  `error` for problems. The environment filters the volume, so err on the side of too much.
- Environments: local dev `trace` with `LOG_FORMAT=console` (never JSON), dev cluster `debug`,
  qa/staging `info`, production `error`. Every cluster environment logs JSON. Set levels through
  `LOG_LEVEL` and `LOG_FORMAT`, never in code; local settings live in the run target or
  `.env.example`.
- Never log secrets, tokens, or personal data, not even at `trace`. Log an opaque or keyed ID.

## Conventions and gotchas

- See `CLAUDE.md` for the branch/commit/PR rules.
- Open every PR as a draft. CI skips drafts, so run the full checks locally, push once they pass,
  and mark the PR ready when the work is finished.
- Nothing may write browser storage before consent. Anything new that stores a preference goes
  through the consent store in `packages/frame/consent.ts`; `scripts/check-no-storage.mjs` fails
  the build otherwise. React Router's `ScrollRestoration` and Docusaurus's announcement bar,
  version memory and tab memory stay off for that reason.
- The header folds into the menu at one breakpoint, set once in `site-frame.css` and
  `header-menu-config.ts`; `frame.test.ts` fails if either site sets its own.
- Lint overrides in `.oxlintrc.json` each say why: kebab-case file names (the product sites'
  names), default exports where React Router and Docusaurus need them, `process.exit` in CLI
  scripts, and no `no-null` (DOM storage and React use null by contract).
- Docusaurus MDX 3: no `{#id}` heading anchors. Docs pages stay `.md` so their emoji pass the
  commit hooks.
- `deploy.yml` never runs in this repo (it checks the repository name); products deploy on a
  published release only.
