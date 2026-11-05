# template-website-docs 🧩

> 🧭 Starting point for a product website and versioned docs site: the shared frame, consent gate, checks and Cloudflare Pages deploy, with no brand.

Every product of the rabbit hole gets a product site and a docs site that look and behave like one
thing. This template is the part they all share, pulled out so a new product starts here instead
of copying another product's site. 🏷️ **Fill in a name and two addresses, and it builds:** every
product value is a marked placeholder that `scripts/init-product.mjs` fills in one pass.

## ✨ Highlights

- 🗂️ **Two static sites, one workspace:** the product site (React Router v7, prerendered) and
  the docs (Docusaurus 3), with the frame and the brand they share as two private packages.
- 🖼️ **One frame on both sites:** the release strip, the header with its 1050px menu, the
  footer and the legal line, drawn from the same markup and tokens, so moving between the sites
  never shifts anything.
- 🍪 **Consent first:** nothing is written to browser storage until the visitor accepts; the
  theme follows the system until then, and the theme switch only opens the cookie bar.
- 📚 **Versioned docs:** a version per release, vNext under its own banner, the version picker
  and a full-width switch in the doc toolbar, folding breadcrumbs, a sidebar without emoji, and
  redirects for moved pages.
- 🔗 **Link previews:** Open Graph and Twitter card tags on every page, with a share image.
- 🌫️ **Coming-soon mode:** one repository variable ships the coming-soon page alone, and the
  build fails if any of the landing page leaks into it.
- ✅ **Checked like a product:** CI fills the placeholders with a fictional product first, then
  lints, tests, builds both sites and checks links, images and storage on the output.
- 🚀 **Deploys on release only:** publishing a GitHub Release builds both sites and uploads
  them to Cloudflare Pages; a merge never puts anything online.

## 🚀 Start a product

[TEMPLATE.md](TEMPLATE.md) lists what a product fills in, in order, and how to take later
template fixes into a product. In short:

```bash
npm ci --ignore-scripts
node scripts/init-product.mjs --product="Example" --slug=example \
  --domain=www.example.com --docs-domain=docs.example.com \
  --github-org=example-org --tagline="One line about what it does" \
  --copyright-holder="Example Org"
npm run format
```

## 🗺️ What is where

- 🧭 **`apps/site`:** the product site: the home page, the Releases page and the coming-soon
  page, prerendered to static HTML.
- 📚 **`apps/docs`:** the docs site, its versions and its theme ([README](apps/docs/README.md)).
- 🖼️ **`packages/frame`:** what both sites share: the product's values (`product.ts`), the frame
  styles and tokens, the release, the consent store and the switches
  ([README](packages/frame/README.md)).
- 🏷️ **`packages/brand`:** the mark, the favicon, the touch icon and the share card, neutral
  placeholders until a product brings its own.
- 🧰 **`scripts`:** filling the placeholders, the docs version cut and check, and the storage,
  image and font checks the CI runs on the built sites.
- 🚢 **`docs/deploy.md`:** how a release deploys, coming-soon mode and rolling back.

## 🛠 Develop

The template's own tree keeps its placeholders. Lint and test it as it is:

```bash
npm ci --ignore-scripts
npm run lint
npm test
```

To see the sites run, fill a separate clone with the fictional Acme product:

```bash
git clone . ../template-preview
cd ../template-preview
npm ci --ignore-scripts
node scripts/init-product.mjs --fixture
npm run build
npm run dev:site        # http://localhost:5173
npm run dev:docs        # http://localhost:3000
```

## 🙏 Acknowledgements

template-website-docs was originally created by [@Bugs5382](https://github.com/Bugs5382).

## ⚖️ License

Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE); [AUTHORS](AUTHORS) lists who holds the
copyright.
