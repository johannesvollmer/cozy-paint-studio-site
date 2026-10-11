import assert from "node:assert/strict";
import test from "node:test";
import { getActiveSectionIndex } from "../src/scripts/active-section.ts";

test("keeps the wordmark active before the first section reaches the reading line", () => {
  assert.equal(getActiveSectionIndex([121.01, 600, 1200], 120), -1);
});

test("activates a section exactly when its top reaches the reading line", () => {
  assert.equal(getActiveSectionIndex([120, 600, 1200], 120), 0);
});

test("treats subpixel rounding at the reading line as reached", () => {
  assert.equal(getActiveSectionIndex([120.25, 600, 1200], 120), 0);
  assert.equal(getActiveSectionIndex([120.75, 600, 1200], 120), 0);
  assert.equal(getActiveSectionIndex([121, 600, 1200], 120), 0);
});

test("keeps the current section active until the next section reaches the line", () => {
  assert.equal(getActiveSectionIndex([-400, 121.01, 700], 120), 0);
});

test("activates the next section at its boundary without selecting the following one", () => {
  assert.equal(getActiveSectionIndex([-900, 120, 800], 120), 1);
});

test("selects the final section after every section start has passed", () => {
  assert.equal(getActiveSectionIndex([-1800, -900, -20], 120), 2);
});

test("Roadmap stays active when Community precedes it in the page but follows it in the menu", () => {
  // Menu: Why, Brushes, Story, Roadmap, Community.
  assert.equal(getActiveSectionIndex([-4000, -3000, -1000, 120, -2000], 120), 3);
});

test("a future section in menu order cannot hide an already reached section", () => {
  assert.equal(getActiveSectionIndex([-2000, -1000, 900, 1800, 120], 120), 4);
});

const permutations = (items) =>
  items.length === 0
    ? [[]]
    : items.flatMap((item, index) =>
        permutations(items.filter((_, other) => other !== index)).map((rest) =>
          [item].concat(rest),
        ),
      );

test("selects by geometry for every permutation of menu order", () => {
  for (const tops of permutations([-1000, -500, 120, 600, 1000])) {
    assert.equal(tops[getActiveSectionIndex(tops, 120)], 120);
  }
});

test("an empty page has no active section", () => {
  assert.equal(getActiveSectionIndex([], 120), -1);
});
