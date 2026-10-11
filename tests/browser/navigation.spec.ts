/* eslint-disable no-await-in-loop -- Each navigation depends on the previous scroll finishing. */
import { expect, test, type Page } from "@playwright/test";

const linksSelector = ".site-header [data-scroll-link]";

async function expectDestination(page: Page, id: string) {
  const link = page.locator(`${linksSelector}[href$="#${id}"]`);
  // Visibility alone passes even when the section is partly hidden by the header.
  await expect
    .poll(() =>
      page.evaluate((targetId) => {
        const target = document.querySelector(`#${CSS.escape(targetId)}`)!;
        const header = document.querySelector(".site-header")!;
        return Math.abs(
          target.getBoundingClientRect().top -
            Math.ceil(header.getBoundingClientRect().bottom + 24),
        );
      }, id),
    )
    .toBeLessThanOrEqual(1);
  await expect(page.locator(`${linksSelector}[aria-current]`)).toHaveCount(1);
  await expect(link).toHaveAttribute("aria-current", "location");
  await expect
    .poll(() => link.evaluate((element) => getComputedStyle(element, "::after").opacity))
    .toBe("1");
}

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:mp4|webm)$/u, (route) => route.abort());
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) return;
  const geometry = await page.evaluate(() => ({
    url: location.href,
    scrollY,
    viewport: { width: innerWidth, height: innerHeight },
    headerBottom: document.querySelector(".site-header")?.getBoundingClientRect().bottom,
    clearance: getComputedStyle(document.documentElement).scrollPaddingBlockStart,
    sections: Array.from(document.querySelectorAll("[data-nav-section]")).map((section) => ({
      id: section.id,
      top: section.getBoundingClientRect().top,
    })),
    current: Array.from(document.querySelectorAll(".site-header [aria-current]")).map((link) =>
      link.getAttribute("href"),
    ),
  }));
  await testInfo.attach("navigation-geometry", {
    body: JSON.stringify(geometry, null, 2),
    contentType: "application/json",
  });
});

for (const route of ["/", "/de/"]) {
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    test(`${route} navigation lands and underlines correctly (${reducedMotion})`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion });
      await page.goto(route);
      const links = page.locator(linksSelector);
      const ids = await links.evaluateAll((elements) =>
        elements.map((element) => (element as HTMLAnchorElement).hash.slice(1)),
      );
      const sections = await page
        .locator("[data-nav-section]")
        .evaluateAll((elements) => elements.map((element) => element.id));
      expect(ids).toEqual(sections);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).toContain("roadmap");
      expect(ids).toContain("community");
      for (const id of ids) {
        await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
      }

      // Start with the reported failure, then exercise both directions and repetition.
      for (const id of ["roadmap", ...ids, ...ids.toReversed(), "roadmap", "community"]) {
        await page.locator(`${linksSelector}[href$="#${id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`, "u"));
        await expectDestination(page, id);
      }
    });
  }

  test(`${route} deep links, keyboard activation, and history agree`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${route}#roadmap`);
    await expectDestination(page, "roadmap");
    await page.reload();
    await expectDestination(page, "roadmap");
    const community = page.locator(`${linksSelector}[href$="#community"]`);
    await community.focus();
    await page.keyboard.press("Enter");
    await expectDestination(page, "community");
    await page.goBack();
    await expectDestination(page, "roadmap");
    await page.goForward();
    await expectDestination(page, "community");
  });

  test(`${route} manual scrolling ignores the URL and menu order`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${route}#roadmap`);
    await expectDestination(page, "roadmap");
    // A real scroll gesture releases the explicit fragment destination.
    const initialScroll = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, -100);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(initialScroll);
    // Deliberately break menu order: geometry must still select the right link.
    await page.locator(".site-header nav").evaluate((nav) => {
      nav.append(...Array.from(nav.children).toReversed());
    });
    for (const id of ["community", "brushes", "story", "roadmap"]) {
      await page.locator(`#${id}`).evaluate((section) => section.scrollIntoView());
      await expectDestination(page, id);
      await expect(page).toHaveURL(/#roadmap$/u);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator(`${linksSelector}[aria-current]`)).toHaveCount(0);
    await expect(page.locator(".wordmark")).toHaveAttribute("aria-current", "page");
  });
}

for (const route of ["/", "/de/"]) {
  test(`${route} navigation survives header wrapping and content changing size`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    for (const width of [1440, 1280, 1024, 900, 640, 390]) {
      await page.setViewportSize({ width, height: 800 });
      await expect
        .poll(() =>
          page.locator(".site-header a").evaluateAll((links) =>
            links.every((link) => {
              const box = link.getBoundingClientRect();
              return (
                document
                  .elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
                  ?.closest("a") === link
              );
            }),
          ),
        )
        .toBe(true);
      await page.locator(`${linksSelector}[href$="#roadmap"]`).click();
      await expectDestination(page, "roadmap");
      await page.locator("#community").evaluate((section) => {
        section.style.minHeight = `${section.getBoundingClientRect().height + 300}px`;
      });
      await page.locator(`${linksSelector}[href$="#community"]`).click();
      await expectDestination(page, "community");
    }
  });
}

test("layout changes preserve the destination until the user scrolls away", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#roadmap");
  await expectDestination(page, "roadmap");
  await page.locator("#community").evaluate((section) => {
    section.style.minHeight = `${section.getBoundingClientRect().height + 400}px`;
  });
  await expectDestination(page, "roadmap");
  await page.mouse.wheel(0, -50000);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.locator("#community").evaluate(async (section) => {
    section.style.minHeight = `${section.getBoundingClientRect().height + 400}px`;
    // Allow layout observers and their scheduled rendering work to finish.
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
  });
  await expect(page.locator(".wordmark")).toHaveAttribute("aria-current", "page");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("section links also work without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  for (const id of ["roadmap", "community"]) {
    await page.locator(`${linksSelector}[href$="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`, "u"));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  await context.close();
});
