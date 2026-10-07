import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { SITE } from "../src/config/site.ts";
import { localizedRoutes } from "../src/i18n/routes.ts";

const root = path.resolve(import.meta.dirname, "..");
/** @type {string[]} */
const errors = [];
const textExtensions = new Set([".astro", ".css", ".html", ".js", ".mjs", ".ts"]);

/**
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  /** @type {string[][]} */
  const files = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(target) : [target];
    }),
  );
  return files.flat();
}

await Promise.all(
  (await collectFiles(path.join(root, "src"))).map(async (file) => {
    if (!textExtensions.has(path.extname(file))) return;
    const content = await readFile(file, "utf8");
    const relative = path.relative(root, file);

    if (/\[(?:POSTAL_ADDRESS|BUSINESS_ADDRESS|PHONE|STORE_URL|TODO|TBD)\]/iu.test(content)) {
      errors.push(`${relative} contains a release-blocking placeholder.`);
    }
    if (/\bCozy Paint\b(?! Studio)/gu.test(content)) {
      errors.push(`${relative} uses the incomplete customer-facing product name.`);
    }
  }),
);

const routePaths = new Set();
for (const [route, translations] of Object.entries(localizedRoutes)) {
  for (const locale of SITE.supportedLocales) {
    const routePath = translations[locale];
    if (!routePath) errors.push(`${route} is missing its ${locale} route.`);
    if (routePaths.has(routePath)) errors.push(`Duplicate localized route: ${routePath}.`);
    routePaths.add(routePath);
  }
}

const expectedPages = [
  "src/pages/index.astro",
  "src/pages/support.astro",
  "src/pages/privacy.astro",
  "src/pages/impressum.astro",
  "src/pages/de/index.astro",
  "src/pages/de/support.astro",
  "src/pages/de/datenschutz.astro",
  "src/pages/de/impressum.astro",
];
await Promise.all(
  expectedPages.map(async (page) => {
    try {
      await readFile(path.join(root, page), "utf8");
    } catch {
      errors.push(`Localized route source is missing: ${page}.`);
    }
  }),
);

if (errors.length > 0) {
  console.error(["Content validation failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content names, placeholders, and localized route pairs are valid.");
}
