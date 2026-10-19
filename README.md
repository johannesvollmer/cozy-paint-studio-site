# Cozy Paint Studio

Cozy Paint Studio is a stylus-first painting app for Windows, designed to help painters move from an idea to a mark without setup getting in the way. It centers on an expansive canvas, responsive brushes, and a workflow that keeps attention on the painting.

This repository contains the app’s public website, not the painting application. The site introduces the product and provides its support, privacy, and legal information in English and German.

## Website development

The site is built with Astro and TypeScript and deployed to GitHub Pages. To run it locally:

```sh
pnpm install
pnpm dev
```

Use `pnpm build` to create the static site or `pnpm validate` to run the repository’s checks. Store release details are configured in `src/config/release.ts`.

## Deployment and Lighthouse

The site is built for `https://cozy-paint-studio.johannesvollmer.com/`, with assets and routes at the domain root. In this repository’s GitHub **Settings → Pages**, configure `cozy-paint-studio.johannesvollmer.com` as the custom domain and enable **Enforce HTTPS** once GitHub has issued its certificate. The `public/CNAME` file records the intended domain, but the Pages domain and certificate must also be configured successfully.

The post-deployment Lighthouse job uses the canonical HTTPS URL in `lighthouserc.cjs`. Do not substitute the legacy `johannesvollmer.com/cozy-paint-studio-site/` deployment URL: root-relative assets return 404 there, causing accessibility and best-practices failures, and its robots.txt belongs to a different site. A certificate mismatch on the custom domain must be resolved in hosting before the live audit can pass.

For a local audit, run `pnpm build` and `pnpm preview`, then set `LHCI_URL=http://localhost:4321/` in your shell and run `pnpm test:performance`. Local scores validate the built pages; the post-deployment check additionally validates public hosting and HTTPS.

The source code is the authority for current website behavior and release configuration. Product and release background is in [`docs/brief.md`](docs/brief.md); remaining release checks are in [`docs/TECHNICAL_PLAN.md`](docs/TECHNICAL_PLAN.md) and [`docs/LEGAL_RELEASE_PLAN.md`](docs/LEGAL_RELEASE_PLAN.md).
