import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/**
 * E2E tests run the website's production build in desktop browsers
 * (`npm run test:e2e` builds first). "small-screen" is the same website in a
 * 375px-wide browser window, to check the responsive layout.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    // Disables smooth scrolling/animations so scroll assertions are deterministic.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    {
      name: "small-screen",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } },
    },
    // Opt-in (CROSS_BROWSER=1): Playwright's Firefox/WebKit builds need host
    // libraries that are not available on every machine (e.g. stock Windows).
    ...(process.env.CROSS_BROWSER
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : []),
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
