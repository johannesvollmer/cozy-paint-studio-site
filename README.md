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

The source code is the authority for current website behavior and release configuration. Product and release background is in [`docs/brief.md`](docs/brief.md); remaining release checks are in [`docs/TECHNICAL_PLAN.md`](docs/TECHNICAL_PLAN.md) and [`docs/LEGAL_RELEASE_PLAN.md`](docs/LEGAL_RELEASE_PLAN.md).
