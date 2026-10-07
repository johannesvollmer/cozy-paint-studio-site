import assert from "node:assert/strict";
import test from "node:test";
import { releaseChannel } from "../src/config/release.ts";
import { validateReleaseChannel } from "../scripts/lib/release-validation.mjs";

test("accepts the checked-in coming-soon configuration", () => {
  assert.deepEqual(validateReleaseChannel(releaseChannel), []);
});

test("rejects an enabled release without a Store URL", () => {
  const channel = { ...releaseChannel, state: "beta", access: "public" };
  assert.match(
    validateReleaseChannel(channel).join("\n"),
    /requires an HTTPS Microsoft Store URL/u,
  );
});

test("rejects a Store URL outside the Microsoft allowlist", () => {
  const channel = {
    ...releaseChannel,
    state: "beta",
    access: "public",
    storeUrl: "https://example.com/download",
    label: { en: "Get the beta", de: "Beta laden" },
  };
  assert.match(validateReleaseChannel(channel).join("\n"), /Unexpected Store host/u);
});

test("requires stable releases to be public and removes prerelease claims", () => {
  const channel = {
    ...releaseChannel,
    state: "stable",
    access: "unlisted",
    storeUrl: "https://apps.microsoft.com/detail/example",
  };
  const errors = validateReleaseChannel(channel).join("\n");
  assert.match(errors, /must use public access/u);
  assert.match(errors, /must not describe a prerelease/u);
});
