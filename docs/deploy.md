# Deploying the sites

## What goes live, and when

Both sites deploy only when a GitHub Release is published in this repo: the product site
(`apps/site`) and the docs (`apps/docs`), together. The `Deploy` workflow
(`.github/workflows/deploy.yml`) listens for the `release: published` event and nothing else: not
a push to `main`, not a pull request, not a manual dispatch. Merging a PR never puts anything on
the internet by itself.

When a release is published, the workflow checks out that release's tag and then:

1. Checks the docs version (`npm run check:docs-version`): the version in
   `packages/frame/release.ts` must be cut in `apps/docs/versions.json`, as the newest version
   there. If it isn't, the run stops before anything builds or deploys. A coming-soon release
   skips this, since it ships no docs.
2. Runs `npm ci --ignore-scripts`, then builds the site, and the docs unless the release is
   coming-soon. The docs build sets `DOCS_INCLUDE_NEXT=true`, so the published docs carry vNext
   (unreleased `main`) under its banner beside the released versions, with the released version
   as the default. Both builds finish before either deploy starts, so a failed build never leaves
   one site on the new release and the other on the old one.
3. Uploads `apps/site/build/client/` to the Pages project `{{SLUG}}-www` and `apps/docs/build/`
   to `{{SLUG}}-docs`, with `cloudflare/wrangler-action` pinned to a commit so a moved tag can't
   change the code trusted with deploy credentials.

## Coming soon

Before a product launches, its site can be a single coming-soon page: the mark, the name, the
tagline and one line. The repository variable `SITE_COMING_SOON` switches it:

- **`true`:** the release builds the coming-soon page alone (`npm run build:coming-soon -w
  @product/site`, which fails if any of the landing page leaks into it) and deploys it to
  `{{SLUG}}-www`. The docs aren't built or deployed.
- **Unset or anything else:** the full site and the docs ship, as above.

Set it under Settings, Secrets and variables, Actions, Variables. Every other build (dev, CI,
previews) keeps the coming-soon page at `/coming-soon` beside the full site, so both can be worked
on.

## Cutting the docs version for a release

The newest cut docs version is the default, at `/docs/`; vNext (`main`) is served at
`/docs/vnext/` under a banner that points at the current version.

A release that changes the product version gets its own PR first:

1. Bump `version`, `upcoming`, `kind` and `publishedOn` in `packages/frame/release.ts`.
2. Run `npm run docs:version`. It snapshots `apps/docs/docs` with `sidebars.ts` under the new
   version.
3. Commit what it wrote (`versions.json`, `versioned_docs/` and `versioned_sidebars/`, all under
   `apps/docs/`) with the bump, and merge the PR.

Then publish the release. If the PR was missed, the deploy fails at the docs version check; merge
the PR and publish the release again. The workflow never commits anything itself: `main` takes
changes only through a PR, and a commit made after the tag wouldn't be in the tagged source.

## Pre-release builds go to dev, not production

Tick "Set as a pre-release" on a GitHub Release to look at a build before it goes live. The
workflow reads `github.event.release.prerelease` and picks the Pages branch from it:

- **Pre-release:** deploys to each project's `dev` branch, served at
  `dev.{{SLUG}}-www.pages.dev` and `dev.{{SLUG}}-docs.pages.dev`.
- **Normal release:** deploys to `main`, each project's production branch: `{{DOMAIN}}` and
  `{{DOCS_DOMAIN}}`.

## Where it lives

- **Cloudflare Pages projects:** `{{SLUG}}-www` (the site) and `{{SLUG}}-docs` (the docs). Before
  each deploy, the workflow lists the account's Pages projects and creates the project
  (production branch `main`) only when it isn't there yet, so the first published release sets it
  up and every later release skips that step.
- **Domains:** `{{DOMAIN}}` on `{{SLUG}}-www`, and `{{DOCS_DOMAIN}}` on `{{SLUG}}-docs`. Attach
  each one to its Pages project once, by hand, in the Cloudflare dashboard (Custom domains), after
  the first deploy has created the project. When the zone's DNS runs on Cloudflare, attaching a
  domain creates its DNS record and certificate. The workflow never touches DNS or custom domains.
- **Credentials:** the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, scoped to
  Cloudflare Pages Edit on the one account. They live in GitHub secrets, never in this repo or its
  workflow logs.

## Rolling back

1. **Publish an older release.** Re-publishing a previous GitHub Release re-runs the `Deploy`
   workflow against that release's tag, which rebuilds and re-uploads both sites. This is the
   normal rollback path, because it goes through the same build the original release did.
2. **Redeploy from the Cloudflare dashboard.** Every deployment stays listed under its Pages
   project's Deployments tab. Picking an older one and choosing "Rollback to this deployment"
   switches that site's traffic to it at once, without rebuilding. This is the faster path when
   the old content has to come back right away.
