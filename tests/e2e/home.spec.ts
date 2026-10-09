import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768;

test.describe("page integrity", () => {
  test("renders without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("exposes production SEO metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Crystal Kizor/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{80,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test("has one h1 and no skipped heading levels", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((headings) => headings.map((heading) => Number(heading.tagName[1])));
    for (let index = 1; index < levels.length; index++) {
      expect(levels[index] - levels[index - 1], `heading ${index}`).toBeLessThanOrEqual(1);
    }
  });

  test("ids are unique and every in-page link has a target", async ({ page }) => {
    await page.goto("/");
    const result = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll("[id]"), (element) => element.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const missing = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
        .map((link) => link.getAttribute("href")!.slice(1))
        .filter((id) => !document.getElementById(id));
      return { duplicates, missing };
    });
    expect(result.duplicates).toEqual([]);
    expect(result.missing).toEqual([]);
  });

  test("every link has an accessible, descriptive name", async ({ page }) => {
    await page.goto("/");
    const vague = await page.locator("a").evaluateAll((links) =>
      links
        .map((link) => (link.textContent ?? "").trim())
        .filter((text) => text === "" || /^(click here|learn more|read more|here)$/i.test(text)),
    );
    expect(vague).toEqual([]);
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("img:not([alt])")).toHaveCount(0);
  });

  test("unknown routes return a branded 404", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: /Return to Crystal Kizor/ })).toHaveAttribute("href", "/");
  });

  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).ok()).toBe(true);
    expect((await request.get("/sitemap.xml")).ok()).toBe(true);
    expect((await request.get("/opengraph-image")).ok()).toBe(true);
  });
});

test.describe("responsive layout", () => {
  for (const width of [375, 390, 640, 768, 1024, 1280, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("navigation", () => {
  test("primary navigation reaches each section", async ({ page }) => {
    test.skip(isMobile(page), "desktop navigation only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const [label, id] of [
      ["Work", "ecosystem"],
      ["Ideas", "ideas"],
      ["About", "about"],
      ["Speaking", "speaking"],
      ["Contact", "contact"],
    ] as const) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`section#${id}`)).toBeInViewport();
    }
  });

  test("mobile menu opens, traps Escape, and closes on selection", async ({ page }) => {
    test.skip(!isMobile(page), "mobile navigation only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    const menu = page.getByRole("navigation", { name: "Mobile" });

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");

    await toggle.click();
    await menu.getByRole("link", { name: /Speaking/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#speaking$/);
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  });

  test("skip link is the first focusable element", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Safari does not Tab to links by default");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});

test.describe("conversion paths", () => {
  test("hero CTAs lead to the ecosystem and speaking sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Explore the work" })).toHaveAttribute("href", "#ecosystem");
    await expect(page.getByRole("link", { name: "Invite Crystal to speak" }).first()).toHaveAttribute(
      "href",
      "#speaking",
    );
  });

  test("every initiative has an action that names its destination", async ({ page }) => {
    await page.goto("/");
    const actions = page.locator("#ecosystem article a");
    await expect(actions).toHaveCount(7);
    for (const text of await actions.allTextContents()) {
      expect(text).toMatch(/^(Visit|Explore|Enquire about) /);
    }
  });

  test("final CTA offers four intent-based routes", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#contact li")).toHaveCount(4);
  });
});

test.describe("analytics", () => {
  test("emits page_view and tracked click events", async ({ page }) => {
    await page.addInitScript(() => {
      const events: string[] = [];
      (window as unknown as { __events: string[] }).__events = events;
      window.addEventListener("ck:analytics", (event) => {
        const detail = (event as CustomEvent<{ name: string; params: Record<string, unknown> }>).detail;
        events.push(`${detail.name}:${detail.params.label ?? ""}`);
      });
    });
    await page.goto("/");
    await page.getByRole("link", { name: "Explore the work" }).click();
    const events = await page.evaluate(() => (window as unknown as { __events: string[] }).__events);
    expect(events).toContain("page_view:");
    expect(events).toContain("hero_cta_click:explore_work");
  });
});
