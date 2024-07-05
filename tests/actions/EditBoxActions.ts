import UIElementActions from "./UIElementActions";

export default class EditBoxActions extends UIElementActions {
  /**
   * Sets the selector
   * @param selector
   * @returns
   */
  public setEditBox(selector: string): EditBoxActions {
    this.setElement(selector);
    return this;
  }

  /**
   * Clear and enter text
   * @param value
   * @returns
   */
  public async fill(value: string) {
    await this.getLocator().fill(value)
    return this;
  }
}
