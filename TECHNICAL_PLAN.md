# Cozy Paint Studio Website — Technical Plan

## Decision summary

Build the website as a statically generated Astro site using TypeScript, native CSS, and minimal progressive JavaScript. It will have no backend, database, authentication, CMS, analytics, cookies, or API layer.

The initial host is GitHub Pages at `https://cozy-paint-studio.johannesvollmer.com`, deployed through GitHub Actions. The finished pages must remain useful with JavaScript disabled.

## Recommended stack

| Area | Choice | Reason |
| --- | --- | --- |
| Site generator | Astro | Produces plain HTML by default and supports file-based routes, metadata, localization, and selective JavaScript |
| Language | TypeScript | Provides typed release configuration, localization maps, and build validation |
| Styling | Native CSS | Suits the custom halftone visual system without a utility-framework abstraction |
| Content | Markdown content collections and typed TypeScript data | Markdown for legal and support copy; typed data for landing-page sections and release state |
| Client behavior | Small vanilla TypeScript modules | Only for media controls, progressive motion, and possibly a later WASM demo |
| Package manager | pnpm | Fast deterministic installs with a committed lockfile |
| Hosting | GitHub Pages initially | Static hosting with a custom domain and enforced HTTPS |
| CI/CD | GitHub Actions | Validates, builds, tests, and deploys changes to `main` |
| Browser tests | Playwright and axe-core | Covers responsive behavior, keyboard use, reduced motion, localization, and accessibility |
| Unit tests | Vitest, used narrowly | Covers release-state and route-mapping logic |
| Link checking | Lychee or equivalent | Checks Store, Discord, support, legal, and alternate-language URLs |
| Performance | Lighthouse CI | Enforces budgets for JavaScript, media, layout shift, and Core Web Vitals |

Astro is preferable to Next.js because this site has no server workload, authenticated state, dynamic data, or application-style client state. Plain Vite could work, but would require custom static routing, metadata, sitemap, and localization infrastructure.

Avoid React, Tailwind, a generic component library, and a headless CMS unless later requirements create a concrete need for them.

## Rendering and routes

Every route is generated as a complete HTML document:

```text
/
├── support/
├── privacy/
├── impressum/
├── de/
│   ├── support/
│   ├── datenschutz/
│   └── impressum/
└── 404.html
```

English is canonical without an `/en/` prefix. German uses `/de/`. Each localized page must provide:

- The correct document `lang` attribute.
- A canonical URL.
- `hreflang="en"`, `hreflang="de"`, and optionally `x-default` links.
- A language switch pointing to the corresponding translated page.
- Localized title, description, navigation, disclosures, and structured data.

All primary navigation and content must work without JavaScript.

## Proposed project structure

```text
/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── media/
│   ├── icons/
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── landing/
│   │   ├── media/
│   │   └── ui/
│   ├── content/
│   │   ├── support/
│   │   ├── privacy/
│   │   └── legal/
│   ├── config/
│   │   ├── release.ts
│   │   ├── external-links.ts
│   │   └── site.ts
│   ├── i18n/
│   │   ├── en.ts
│   │   ├── de.ts
│   │   └── routes.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── LegalLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── support.astro
│   │   ├── privacy.astro
│   │   ├── impressum.astro
│   │   ├── de/
│   │   └── 404.astro
│   ├── scripts/
│   │   ├── media-controls.ts
│   │   └── ambient-motion.ts
│   └── styles/
│       ├── tokens.css
│       ├── global.css
│       ├── utilities.css
│       └── print.css
├── scripts/
│   ├── validate-content.ts
│   └── validate-release.ts
├── tests/
├── astro.config.mjs
├── package.json
└── pnpm-lock.yaml
```

The site should use a small number of purposeful components. Most sections are editorial compositions rather than generic application controls.

## Release-state architecture

The Store channel is one typed configuration shared by the header, hero, prerelease disclosure, final call to action, footer, and structured data:

```ts
type ReleaseState = "coming-soon" | "alpha" | "beta" | "stable";

interface ReleaseChannel {
  state: ReleaseState;
  storeUrl?: `https://${string}`;
  access: "none" | "invite-only" | "unlisted" | "public";
  label: {
    en: string;
    de: string;
  };
  disclosure: {
    en: string;
    de: string;
  };
  windowsRequirement: {
    en: string;
    de: string;
  };
}
```

The production build must fail when:

- An enabled Store action has no valid HTTPS URL.
- A legal placeholder such as `[POSTAL_ADDRESS]` remains.
- The customer-facing name `Cozy Paint` appears instead of `Cozy Paint Studio`.
- A required route lacks its translation counterpart.
- A live external URL uses an unexpected domain.
- A future-only capability is presented as currently available.
- Production metadata disagrees with the configured release state.

## CSS and visual implementation

Use native CSS custom properties for:

- Color and contrast tokens.
- Iosevka font stacks and fluid typography.
- Nested radii.
- Section spacing.
- Focus-ring values.
- Motion durations and easing.
- Media aspect ratios.

Implement the three-color halftone material using layered CSS radial gradients. Their differently rotated lattices deliberately produce a stable moiré interference pattern; this is part of the material rather than an artifact to remove. It is a reusable material for controls and framing surfaces, not an animated full-page wallpaper.

Recommended CSS features:

- Cascade layers: `reset`, `tokens`, `base`, `components`, and `utilities`.
- `clamp()` for typography and spacing.
- CSS Grid for editorial composition and the project wall.
- Container queries for self-contained sections.
- Logical properties.
- `prefers-reduced-motion` and `prefers-contrast` handling.
- Dedicated print styles for legal pages.

Do not use CSS-in-JS. Preserve WCAG 2.2 AA contrast even where the app's current theme tokens need adjustment for web copy.

## Images and video

All assets are self-hosted:

- Use Astro's image pipeline for responsive AVIF and WebP output.
- Provide explicit dimensions and aspect ratios for every image.
- Provide WebM or AV1 video plus an MP4 fallback.
- Include a poster image for every video.
- Provide captions or a nearby text equivalent where required.
- Never autoplay with sound.
- Do not embed YouTube, Vimeo, Discord, Store, or social widgets.

Video encoding should be a deliberate asset-production step rather than part of every site build. This keeps CI fast and makes published media reviewable.

## JavaScript budget

Legal and support pages should ship no client JavaScript. The landing page should preferably remain below 20–30 KB of compressed JavaScript.

JavaScript is justified only for:

- Accessible custom media controls when native controls are insufficient.
- Optional halftone parallax or ambient motion.
- Pausing animation when hidden or offscreen.
- A future opt-in painting demo.

Release-state selection happens at build time and requires no runtime JavaScript.

## Optional WASM painting demo

Treat the real painting-engine demo as a later phase, not part of the first launch.

If implemented:

1. Compile a deliberately reduced engine package from the application repository.
2. Load it only after explicit visitor activation.
3. Display its download size before activation if substantial.
4. Run it inside a bounded canvas area.
5. Do not intercept normal page scrolling.
6. Provide keyboard-accessible activation and reset controls.
7. Keep painting state ephemeral.
8. Provide a static poster and explanation when WASM or the required graphics API is unavailable.
9. Exclude it from first-page loading and Core Web Vitals.

## Accessibility and quality assurance

Automated CI checks should cover:

- HTML and TypeScript validity.
- WCAG checks using axe-core.
- Keyboard navigation and visible focus.
- English/German route pairing.
- Mobile through wide-desktop rendering.
- 200% text zoom.
- Reduced-motion behavior.
- Missing alternative text and captions.
- Broken internal and external links.
- Sitemap, canonical URL, and `hreflang` correctness.
- Unexpected third-party requests.
- JavaScript-disabled smoke tests.
- Production bundle and media-size budgets.

Manual release checks should cover pen and touch behavior, screen-reader flow, German editorial quality, legal review, real app capture verification, and Microsoft Store badge compliance.

## Deployment

GitHub Actions should:

1. Install dependencies using the committed pnpm lockfile.
2. Run content and release validation.
3. Type-check and build the Astro site.
4. Run browser and accessibility smoke tests against the build.
5. Check external links.
6. Upload `dist/` as the GitHub Pages artifact.
7. Deploy only from protected `main`.

Set Astro's canonical site URL to:

```ts
site: "https://cozy-paint-studio.johannesvollmer.com"
```

Because the site uses a custom domain, do not configure a repository-name base path. Configure and verify the domain in GitHub, create the appropriate DNS CNAME, and enforce HTTPS.

## GitHub Pages security limitation

GitHub Pages is adequate for the initial release, but it does not provide normal per-site response-header configuration.

For the initial GitHub Pages deployment:

- Use a strict CSP in an HTML `<meta http-equiv="Content-Security-Policy">` element.
- Set the referrer policy through document metadata.
- Enforce HTTPS.
- Avoid inline and third-party content.
- Keep dependencies minimal.

Headers such as `X-Content-Type-Options` cannot safely be emulated using arbitrary `http-equiv` metadata. If real HTTP response headers become a hard acceptance requirement, deploy the same static `dist/` build through Cloudflare Pages or another configurable static host. That remains a frontend-only architecture.

The privacy policy must disclose GitHub Pages' processing of visitor request data, including the IP-address logging GitHub documents for security purposes.

## Delivery phases

1. **Foundation:** Initialize Astro, routing, design tokens, fonts, localization, layouts, metadata, and release configuration.
2. **Core pages:** Build the landing page, support, privacy, Datenschutz, Impressum, legal notice, and 404 page.
3. **Real media:** Add screenshots, optimized artwork, interaction videos, captions, and credits.
4. **Hardening:** Add content validation, accessibility checks, link checks, performance budgets, CSP, sitemap, and structured data.
5. **Launch:** Verify the domain, deploy to GitHub Pages, enforce HTTPS, and verify Store and support URLs.
6. **Optional enhancement:** Add the click-to-load WASM painting demo if it proves worthwhile without compromising page performance.

## Reference documentation

- [Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Astro: Internationalization routing](https://docs.astro.build/en/guides/internationalization/)
- [GitHub: Securing GitHub Pages with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [GitHub: Verifying a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub: What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [MDN: `meta http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv)
