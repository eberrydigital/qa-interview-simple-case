import { type Locator, type Page } from '@playwright/test'
import Constants from '../helpers/constants'

export default class UIElementActions {
  protected locator!: Locator
  protected selector!: string

  constructor(private page: Page) {}

  /**
   * Returns the first locator
   * @returns
   */
  public getLocator(): Locator {
    return this.locator.first()
  }

  /**
   * Sets the locator using the selector *
   * @param selector
   * @returns
   */
  public setElement(selector: string): UIElementActions {
    this.selector = selector
    this.locator = this.page.locator(this.selector)
    return this
  }

  /**
   * Click on element
   * @returns
   */
  public async click(options?: {}) {
    await this.getLocator().click(options)
    return this
  }

  /**
   * wait for element to be visible
   * @returns
   */
  public async waitTillVisible() {
    await this.getLocator().waitFor({
      state: 'visible',
      timeout: Constants.WAIT,
    })
    return this
  }
}
