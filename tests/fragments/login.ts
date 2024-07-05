import UIActions from '../actions/UIActions';
import { expect, type Page } from '@playwright/test'

interface User {
  email: string
  password: string
}

const selectors = {
  USER_NAME: '#email',
  PASSWORD: '#password',
  SUBMIT: '[data-testid="submit"]',
  SIGNUP: '[href="/signup"]'
};

export class Login {
  private web: UIActions
  public locators: object

  constructor(private page: Page) {
    this.page = page;
    this.web = new UIActions(this.page);
    this.locators = selectors;
  }


  public async gotoUrl(endpoint = '/'): Promise<void> {
    const url = `http://localhost:8080${endpoint}`;
    await this.web.goto(url);
  }

  public async fillLogin(username: string, password: string): Promise<void> {
    await this.web.element(selectors.USER_NAME).waitTillVisible();
    username && (await this.web.editBox(selectors.USER_NAME).fill(username));
    password && (await this.web.editBox(selectors.PASSWORD).fill(password));
  }

  public async login(endpoint = '/', user: User): Promise<void> {
    await this.gotoUrl(endpoint)
    await this.fillLogin(user.email, user.password)
    await this.web.element(selectors.SUBMIT).click()
  }

  public async logout(){
    await this.page.getByRole('button', {name: 'Log out'}).click();
    await expect(this.page.getByRole('heading', {name: 'Login', level: 2})).toBeVisible();
  }
}
