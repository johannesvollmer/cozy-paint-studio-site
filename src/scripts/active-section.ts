/** Returns the last section whose top has reached the header reading line. */
export function getActiveSectionIndex(sectionTops: readonly number[], readingLine: number): number {
  let activeIndex = -1;
  const subpixelTolerance = 0.5;

  for (const [index, top] of sectionTops.entries()) {
    if (top > readingLine + subpixelTolerance) break;
    activeIndex = index;
  }

  return activeIndex;
}
