import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page"; //like below we have defined a short way of locating the directories in tsconfig.json.
// import { registerUser } from "../../lib/datafactory/register";
import { registerUser } from "@datafactory/register";

test("login without page object", async ({ page }) => {
  // await page.goto("https://practicesoftwaretesting.com/");
  const loginPage = new LoginPage(page); //constructor of LoginPage clas gets initialized automatically at this step

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

test("Login with newly created user", async ({ page }) => {
  const email = `test${Date.now()}@gmail.com`;
  const password = "abcdefJH123@";
  await registerUser(email, password);
  const loginPage = new LoginPage(page); //constructor of LoginPage clas gets initialized automatically at this step
  await loginPage.goto("https://practicesoftwaretesting.com/");
  await loginPage.clickSignInLink();
  await loginPage.login(email, password);

  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "test testlname"
  );
  // await expect(page.locator('[data-test="page-title"]')).toContainText(
  //   "My account"
  // );
});
