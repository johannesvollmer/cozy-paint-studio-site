/** Returns the last section whose top has reached the header reading line. */
export function getActiveSectionIndex(sectionTops: readonly number[], readingLine: number): number {
  let activeIndex = -1;

  for (const [index, top] of sectionTops.entries()) {
    if (top > readingLine) break;
    activeIndex = index;
  }

  return activeIndex;
}
