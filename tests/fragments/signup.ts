import UIActions from '../actions/UIActions';
import { type Page } from '@playwright/test'

interface register {
  firstname: string,
  lastname: string,
  email: string
  password: string
}

const selectors = {
  FIRST_NAME: '#firstName',
  LAST_NAME: '#lastName',
  EMAIL: '#email',
  PASSWORD: '#password',
}

export class Signup {
  private web: UIActions
  public locators: object

  constructor(private page: Page) {
    this.page = page
    this.web = new UIActions(this.page)
    this.locators = selectors
  }

  public async fillRegistration({ user }): Promise<void> {
    user.firstname &&
      (await this.web.editBox(selectors.FIRST_NAME).fill(user.firstname))
    user.lastname &&
      (await this.web.editBox(selectors.LAST_NAME).fill(user.lastname))
    user.email && (await this.web.editBox(selectors.EMAIL).fill(user.email))
    user.password &&
      (await this.web.editBox(selectors.PASSWORD).fill(user.password))
  }

  public async register(userInfo: register): Promise<void> {
    await this.fillRegistration({ user: userInfo })
    await this.page.getByRole('button', { name: 'Submit' }).click()
  }
}
