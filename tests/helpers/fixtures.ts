import { test as base, mergeTests, expect } from "@playwright/test";
import { Login } from "../fragments/login";
import { Signup } from "../fragments/signup";
import { Logout } from "../fragments/logout";
import { Snapshot } from "./snapshot";

const pages = base.extend({
  /* Application fixture */
  login: async ({ page }, use) => {
    await use(new Login(page));
  },
  signup: async ({ page }, use) => {
    await use(new Signup(page));
  },
  logout:async ({ page }, use) => {
    await use(new Logout(page));
  },
});

const components = base.extend({
  /* Here we will write framework components related to snapshot, screenshots, 
  resusable helper components like tables, modals, popup etc */
  expect: async ({ }, use) => {
    await use(expect);
  },

  snapshot: async ({ page }, use, testInfo) => {
    await use(new Snapshot(page, testInfo));
  },
});

export const test = mergeTests(pages, components);

