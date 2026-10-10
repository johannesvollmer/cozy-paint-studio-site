import assert from "node:assert/strict";
import test from "node:test";
import { getActiveSectionIndex } from "../src/scripts/active-section.ts";

test("keeps the wordmark active before the first section reaches the reading line", () => {
  assert.equal(getActiveSectionIndex([121, 600, 1200], 120), -1);
});

test("activates a section exactly when its top reaches the reading line", () => {
  assert.equal(getActiveSectionIndex([120, 600, 1200], 120), 0);
});

test("treats subpixel rounding at the reading line as reached", () => {
  assert.equal(getActiveSectionIndex([120.25, 600, 1200], 120), 0);
});

test("keeps the current section active until the next section reaches the line", () => {
  assert.equal(getActiveSectionIndex([-400, 121, 700], 120), 0);
});

test("activates the next section at its boundary without selecting the following one", () => {
  assert.equal(getActiveSectionIndex([-900, 120, 800], 120), 1);
});

test("selects the final section after every section start has passed", () => {
  assert.equal(getActiveSectionIndex([-1800, -900, -20], 120), 2);
});
