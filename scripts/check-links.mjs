import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { SITE } from "../src/config/site.ts";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
/** @type {string[]} */
const errors = [];

/**
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const target = path.join(directory, entry.name);
        if (entry.isDirectory()) return htmlFiles(target);
        return entry.name.endsWith(".html") ? [target] : [];
      }),
    )
  ).flat();
}

/** @param {URL} url */
function outputPath(url) {
  const pathname = decodeURIComponent(url.pathname);
  if (path.extname(pathname)) return path.join(dist, pathname.slice(1));
  return path.join(dist, pathname.slice(1), "index.html");
}

/**
 * @param {string} value
 * @param {URL} pageUrl
 * @param {string} pagePath
 */
async function checkReference(value, pageUrl, pagePath) {
  if (/^(?:data:|mailto:|tel:|javascript:)/u.test(value)) return;
  const url = new URL(value, pageUrl);
  if (url.origin !== SITE.origin) return;

  try {
    const targetContent = await readFile(outputPath(url), "utf8");
    const id = decodeURIComponent(url.hash.slice(1));
    const fragmentExists =
      !id || targetContent.includes(`id="${id}"`) || targetContent.includes(`id='${id}'`);
    if (!fragmentExists) errors.push(`${pagePath}: ${value} points to a missing fragment.`);
  } catch {
    errors.push(`${pagePath}: ${value} points to a missing build output.`);
  }
}

/** @param {string} file */
async function checkPage(file) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(dist, file).replaceAll("\\", "/");
  const pagePath = `/${relative.replace(/index\.html$/u, "")}`;
  const pageUrl = new URL(pagePath, SITE.origin);
  const values = [...html.matchAll(/\b(?:href|src)=(?:"([^"]+)"|'([^']+)')/gu)].flatMap((match) => {
    const value = match[1] ?? match[2];
    return value ? [value] : [];
  });
  await Promise.all(values.map((value) => checkReference(value, pageUrl, pagePath)));
}

await Promise.all((await htmlFiles(dist)).map((file) => checkPage(file)));

if (errors.length > 0) {
  console.error(["Internal link check failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exitCode = 1;
} else {
  console.log("All generated internal links and fragments resolve.");
}
