import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cozy-paint-studio.johannesvollmer.com",
  output: "static",
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
