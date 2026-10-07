import { readFile } from "node:fs/promises";
import { releaseChannel } from "../src/config/release.ts";
import { validateReleaseChannel } from "./lib/release-validation.mjs";

const errors = validateReleaseChannel(releaseChannel);
const legalNotice = await readFile(
  new URL("../src/components/legal/LegalNoticePage.astro", import.meta.url),
  "utf8",
);
const landingPage = await readFile(
  new URL("../src/components/landing/LandingPage.astro", import.meta.url),
  "utf8",
);

if (releaseChannel.state !== "coming-soon") {
  if (/not a complete German legal notice|kein vollstÃ¤ndiges Impressum/iu.test(legalNotice)) {
    errors.push("A live release cannot ship with an explicitly incomplete legal notice.");
  }
  if (!landingPage.includes("application/ld+json")) {
    errors.push("A live release requires reviewed SoftwareApplication structured data.");
  }
} else if (landingPage.includes("application/ld+json")) {
  errors.push("SoftwareApplication data must stay disabled until release facts are complete.");
}

if (errors.length > 0) {
  console.error(["Release validation failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Release configuration is consistent (${releaseChannel.state}).`);
}
