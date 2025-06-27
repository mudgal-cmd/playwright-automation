import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../lib/pages/login.page";

setup("Create customer 01 auth", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";
  const loginPage = new LoginPage(page);

  await loginPage.goto("https://practicesoftwaretesting.com/auth/login");

  // await loginPage.emailInput.fill(email); -- created a single login function that will do all these functions
  // await loginPage.passwordInput.fill(password);
  // await loginPage.loginBtn.click();
  await loginPage.login(email, password); // this single login function in the LoginPage class will perform the entire login process

  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  await context.storageState({ path: customer01AuthFile });
});
