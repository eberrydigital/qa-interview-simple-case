import { expect, type Page } from '@playwright/test'

export class Logout {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  public async logout() {
    await this.page.getByRole('button', { name: 'Log out' }).click()
    await expect(
      this.page.getByRole('heading', { name: 'Login', level: 2 }),
    ).toBeVisible()
  }
}
