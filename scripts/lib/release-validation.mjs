const MICROSOFT_STORE_HOSTS = new Set(["apps.microsoft.com", "www.microsoft.com"]);
/** @type {readonly ["en", "de"]} */
const LOCALES = ["en", "de"];

/** @param {import("../../src/config/release.ts").ReleaseChannel} channel */
export function validateReleaseChannel(channel) {
  const errors = [];
  const hasStoreUrl = typeof channel.storeUrl === "string";

  if (channel.state === "coming-soon") {
    if (channel.access !== "none") {
      errors.push('A "coming-soon" release must use access "none".');
    }
    if (hasStoreUrl) {
      errors.push('A "coming-soon" release must not expose a Store URL.');
    }
  } else {
    if (channel.access === "none") {
      errors.push(`A ${channel.state} release must expose a release destination.`);
    }
    if (!hasStoreUrl) {
      errors.push(`A ${channel.state} release requires an HTTPS Microsoft Store URL.`);
    }
  }

  if (channel.state === "stable" && channel.access !== "public") {
    errors.push('A "stable" release must use public access.');
  }

  if (channel.storeUrl) errors.push(...validateStoreUrl(channel.storeUrl));

  errors.push(...validateLocalizedFields(channel));

  const combinedCopy = [
    ...Object.values(channel.label ?? {}),
    ...Object.values(channel.disclosure ?? {}),
  ].join(" ");
  if (channel.state !== "coming-soon" && /coming soon|kommt bald/iu.test(combinedCopy)) {
    errors.push("Live release copy must not claim the release is coming soon.");
  }
  if (channel.state === "stable" && /prototype|preview|alpha|beta|vorab/iu.test(combinedCopy)) {
    errors.push("Stable release copy must not describe a prerelease.");
  }

  return errors;
}

/** @param {import("../../src/config/release.ts").ReleaseChannel} channel */
function validateLocalizedFields(channel) {
  const errors = [];
  const localizedFields = {
    label: channel.label,
    disclosure: channel.disclosure,
    windowsRequirement: channel.windowsRequirement,
  };
  for (const locale of LOCALES) {
    for (const [field, copy] of Object.entries(localizedFields)) {
      if (!copy[locale]?.trim()) errors.push(`Release ${field}.${locale} must not be empty.`);
    }
  }
  return errors;
}

/** @param {string} value */
function validateStoreUrl(value) {
  const errors = [];
  let storeUrl;
  try {
    storeUrl = new URL(value);
  } catch {
    return ["The Store URL is not a valid absolute URL."];
  }
  if (storeUrl.protocol !== "https:") errors.push("The Store URL must use HTTPS.");
  if (!MICROSOFT_STORE_HOSTS.has(storeUrl.hostname)) {
    errors.push(`Unexpected Store host: ${storeUrl.hostname}.`);
  }
  return errors;
}
