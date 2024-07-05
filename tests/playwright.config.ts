import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  testDir: './e2e',
  testMatch: 'test_*.ts',
  snapshotPathTemplate: './__snaps__/{arg}{ext}',
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: './reports/playwright-report' }]],
  outputDir: 'reports/test-results/',

  projects: [
    // Setup project
    { name: 'setup', testDir: './test-setup/', testMatch: '*' },
    {
      name: 'chromium',
      testDir: './e2e/',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
        trace: 'retain-on-failure',
      },
      dependencies: ['setup'],
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 8080,
    timeout: 60 * 1000,
    reuseExistingServer: true,
  },
})
