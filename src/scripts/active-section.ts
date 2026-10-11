/**
 * Select the nearest section start at or above the reading line.
 * Geometry determines ownership, independently of menu or DOM ordering.
 */
export function getActiveSectionIndex(sectionTops: readonly number[], readingLine: number): number {
  let activeIndex = -1;
  // Native fragment scrolling may truncate a fractional CSS-pixel offset.
  // A destination within one CSS pixel of the boundary has been reached.
  const subpixelTolerance = 1;
  let nearestTop = -Infinity;

  for (const [index, top] of sectionTops.entries()) {
    if (top <= readingLine + subpixelTolerance && top > nearestTop) {
      nearestTop = top;
      activeIndex = index;
    }
  }

  return activeIndex;
}
