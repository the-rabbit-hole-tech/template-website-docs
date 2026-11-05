# Using the template 🧩

> 🧭 How a new product turns this template into its own website and docs, and how it keeps taking the template's fixes afterwards

The template is the structure and the wiring every product site shares: the npm workspaces, the
frame, the consent gate, the docs versioning, the checks and the deploy. It carries no product's
brand, tokens or copy. A product fills in its name and addresses once, then replaces the neutral
placeholders (the grey tokens, the square mark, the sample pages) with its own.

## 🧾 The placeholders

Every product value in the tree is a marked placeholder. `scripts/init-product.mjs` fills them
all at once; `packages/frame/product.ts` is the one place the code reads them from.

| Placeholder            | Flag                 | What it is                                     | Where it lands                                                                                    |
| ---------------------- | -------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `{{PRODUCT}}`          | `--product`          | The product's name as people write it          | The header, footer, page titles, docs pages, the share card                                       |
| `{{SLUG}}`             | `--slug`             | Lowercase letters, digits and hyphens          | The Pages projects (`<slug>-www`, `<slug>-docs`), the storage keys (`<slug>-site`, `<slug>-docs`) |
| `{{DOMAIN}}`           | `--domain`           | The product site's host, no scheme             | Absolute URLs in link previews, the docs' links back to the site                                  |
| `{{DOCS_DOMAIN}}`      | `--docs-domain`      | The docs site's host, no scheme                | The docs' own URL, the header and strip links to the docs                                         |
| `{{GITHUB_ORG}}`       | `--github-org`       | The GitHub organisation that holds the product | The GitHub and security policy links, the Releases page, "Edit this page"                         |
| `{{TAGLINE}}`          | `--tagline`          | One short line under the name                  | The footer, the home page, the docs home, page descriptions                                       |
| `{{COPYRIGHT_HOLDER}}` | `--copyright-holder` | Who the footer's copyright line names          | The legal line on both sites                                                                      |

The values may not contain quotes, backslashes, `<`, `>`, `{`, `}`, `$` or a line break, since
they land in code, JSON, YAML and HTML; the name may not contain `:` or `#` either. The script
checks every value before it writes anything.

## 🚀 Start a product, in order

### Before you start

- Node.js at the version in `.nvmrc`, and npm.
- The product's repository, created on GitHub from this template ("Use this template"), cloned
  locally.

### Steps

1. Install the dependencies. Always pass `--ignore-scripts`:

   ```bash
   npm ci --ignore-scripts
   ```

2. Fill in the placeholders with the product's own values:

   ```bash
   node scripts/init-product.mjs \
     --product="Example" \
     --slug=example \
     --domain=www.example.com \
     --docs-domain=docs.example.com \
     --github-org=example-org \
     --tagline="One line about what it does" \
     --copyright-holder="Example Org"
   ```

   Add `--dry-run` first to see which files it would change. To see the template filled in
   without your own values, `node scripts/init-product.mjs --fixture` uses the fictional Acme
   product on example.com addresses; that's what CI runs.

3. Format what moved, then run the checks:

   ```bash
   npm run format
   npm run lint
   npm test
   npm run build
   ```

4. Replace the brand placeholders in `packages/brand/public/`: the light and dark marks
   (`img/brand/mark-light.svg`, `img/brand/mark-dark.svg`), `favicon.svg`, the 180x180
   `apple-touch-icon.png`, and the 1200x630 share card `img/brand/og-card.png`. The card's source
   is `packages/brand/og-card.html`; its header comment says how to render it.
5. Set the product's colours: the `--frame-*` tokens in `packages/frame/site-frame.css` (both
   sites) and the `--docs-*` tokens in `apps/docs/src/css/theme.css` (the docs pages). The
   contrast test in `packages/frame/frame.test.ts` checks body links still meet WCAG AA. Fonts
   are the system stack until the product self-hosts some: `packages/frame/public/fonts/README.md`
   says how.
6. Write the site's copy: the landing page in `apps/site/app/content/home.ts`, the coming-soon
   page in `apps/site/app/content/coming-soon.ts`, the Releases page's files in
   `apps/site/app/content/release.ts`, and the header and footer links in
   `packages/frame/content.ts`. New landing sections are `<Section>`s in
   `apps/site/app/routes/home.tsx`.
7. Write the docs: replace the sample pages in `apps/docs/docs/` and the sidebar in
   `apps/docs/sidebars.ts`, and the cards on the docs home in `apps/docs/src/pages/index.tsx`.
   Set the first release in `packages/frame/release.ts`, then cut its docs version with
   `npm run docs:version`. The template ships one sample snapshot, `v0.1.0`; when the product's
   first release has another version, remove the sample (`apps/docs/versioned_docs/version-v0.1.0/`,
   `apps/docs/versioned_sidebars/version-v0.1.0-sidebars.json` and its line in
   `apps/docs/versions.json`) in the same PR.
8. Set up the deploy (`docs/deploy.md`): the secrets `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`, and the repository variable `SITE_COMING_SOON=true` while the product
   isn't launched yet. After the first published release, attach the domains to the two Pages
   projects in Cloudflare.
9. Commit the result in one PR, and say in its body which template release the product started
   from: the tag of the release the clone came from (the newest one on the template's Releases
   page when it was made, for example `v1.2.0`). That tag is where the next sync starts.

## 🔁 Taking later template fixes

A fix to anything this template shares lands here first, and every merge here publishes a
release. Each product then takes the fixes in its own PR, from the release it last synced to a
newer one: always tag to tag, never from a commit between releases. The product's history isn't the template's, so fixes come across commit by commit with
`git cherry-pick`, which applies each fix's change on top of the product's tree.

1. Add the template as a second remote, once, and fetch it:

   ```bash
   git remote add template https://github.com/the-rabbit-hole-tech/template-website-docs.git
   git fetch template --tags
   ```

2. On a branch, list the template's commits between the release the product last synced to (the
   one it started from, or the last one it took) and the release it's syncing to, then take each
   fix:

   ```bash
   git log --oneline <last-tag>..<new-tag>
   git cherry-pick -x <commit>
   ```

   `-x` records the template commit in the product's commit message. Name both tags in the PR
   body; the new one is where the next sync starts.

3. Where a fix touches a line the product filled in or rebranded, the cherry-pick stops with a
   conflict: keep the product's value and the template's change around it. Lines that still hold a
   placeholder after the merge are filled the same way as at the start
   (`node scripts/init-product.mjs` with the product's values only touches placeholders).
4. Run the checks (step 3 above) and open the PR.

## 📐 What belongs here, and what doesn't

- ✅ **In the template:** what every product's site and docs share, wired the same way: the
  layout, the frame, the consent gate, the docs versioning, the checks, the deploy.
- 🚫 **Not in the template:** any product's brand, colours, copy, domains or names, and anything
  one product does its own way. That stays in the product's repo.
- 🔄 **Kept current:** when a product improves or fixes a shared part, the same change comes back
  here in that wave, then goes out to the other products.
