import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cozy-paint-studio.johannesvollmer.com",
  output: "static",
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        // Allow same-origin resource checks, including Lighthouse's robots.txt fetch.
        "connect-src 'self'",
        "font-src 'self'",
        "form-action 'none'",
        "frame-src 'none'",
        "img-src 'self' data:",
        "media-src 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
