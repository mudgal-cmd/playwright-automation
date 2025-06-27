import { test, expect } from "@playwright/test";
import {LoginPage} from "../../lib/pages/login.page";

test("login without page object", async ({ page }) => {
  // await page.goto("https://practicesoftwaretesting.com/");
  const loginPage = new LoginPage(page);//constructor of LoginPage clas gets initialized automatically at this step

  await loginPage.goto("https://practicesoftwaretesting.com/");
  // await page.locator('[data-test="nav-sign-in"]').click();
  await loginPage.clickSignInLink();

  // await page
  //   .locator('[data-test="email"]')
  //   .fill("customer@practicesoftwaretesting.com");
  // await page.locator('[data-test="password"]').fill("welcome01");
  // await page.locator('[data-test="login-submit"]').click();

  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});
