import { type Page, expect } from '@playwright/test'

export class Snapshot {
  page: Page
  testInfo: any

  constructor(page: Page, testInfo: any) {
    this.page = page
    this.testInfo = testInfo
  }

  /* The images are generated based on mac. But on ci-cd pipeline 
  we will handle conditionally for different platforms like mac, windows and linux */
  async expectToMatchScreenshot(element: string, fileName: string) {
    await expect(this.page.locator(element)).toHaveScreenshot(
      [`__screenshots__/local`, `${fileName}.png`],
      {
        maxDiffPixels: 25,
        threshold: 0.1,
      },
    )
  }
}
