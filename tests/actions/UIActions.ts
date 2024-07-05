import { type Page } from "@playwright/test";
import EditBoxActions from "./EditBoxActions";
import UIElementActions from "./UIElementActions";
import Constants from "../helpers/constants";

export default class UIActions {
  private editBoxAction: EditBoxActions;
  private elementAction: UIElementActions;

  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
    this.editBoxAction = new EditBoxActions(page);
  }

  /**
   * Navigate to specified URL
   * @param URL
   */
  public async goto(URL: string) {
    await this.page.goto(URL, { timeout: Constants.WAIT, waitUntil: "load" });
  }

  /**
   * Returns the instance of UIElements actions
   * @param selector
   * @returns
   */
  public element(selector: string) {
    return this.elementAction.setElement(selector);
  }

  /**
   * Returns the instance of editbox actions
   * @param selector
   * @returns
   */
  public editBox(selector: string) {
    return this.editBoxAction.setEditBox(selector);
  }
}
