import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/de/",
  "/support/",
  "/de/support/",
  "/privacy/",
  "/de/datenschutz/",
  "/impressum/",
  "/de/impressum/",
  "/404.html",
];

test.beforeEach(async ({ page }) => {
  await page.route(/\.(?:mp4|webm)$/u, (route) => route.abort());
});

for (const route of routes) {
  test(`${route} has no automated WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("keyboard navigation starts with a working skip link and exposes focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip/iu });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("position", "fixed");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("the 404 header links back to real home-page sections", async ({ page }) => {
  await page.goto("/404.html");
  const sectionLinks = page.locator("header [data-scroll-link]");
  await expect(sectionLinks).toHaveCount(5);
  await Promise.all(
    (await sectionLinks.all()).map((link) =>
      expect(link).toHaveAttribute("href", /^\/(?:de\/)?#\S+$/u),
    ),
  );
});

test("landmarks and headings provide a screen-reader document outline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.getByRole("contentinfo")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("navigation")).toHaveCount(2);
});

test("controls meet the WCAG 2.2 minimum target size", async ({ page }) => {
  await page.goto("/");
  const controls = page.locator("header a, header button");
  await Promise.all(
    (await controls.all()).map(async (control) => {
      const box = await control.boundingBox();
      expect(box, "control should have a layout box").not.toBeNull();
      expect(box?.width).toBeGreaterThanOrEqual(24);
      expect(box?.height).toBeGreaterThanOrEqual(24);
    }),
  );
});

test("reduced motion disables smooth scrolling and autoplay", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator("[data-hero-video]")).not.toHaveAttribute("autoplay", "");
  await expect(page.locator("[data-zoom-demo]")).toHaveJSProperty("paused", true);
});

test("content reflows at a 200% zoom equivalent without horizontal page overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 720 });
  await page.goto("/");
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
