import { test, expect } from "@playwright/test";
import { createContactMessage } from "@datafactory/contactmessage";
import { registerUser } from "@datafactory/register";
import { LoginPage } from "@pages/login/login.page";

test("Create contact message", async ({ page, context }) => {
  const email = `test${Date.now()}@gmail.com`;
  const password = "WelcomeGold23@";
  const messageAuthFile = ".auth/messageAuth.json";

  //now moving to login into the app using the same credentials with which we registered the user

  await test.step("create a new user and login", async () => {
    const loginPage = new LoginPage(page);
    const url = process.env.URL + "/auth/login";
    await registerUser(email, password); // registered the user
    await loginPage.goto(url);
    await loginPage.login(email, password); // logged into the app

    //assert to ensure that the user has actually logged in.

    expect(await page.getByTestId("nav-menu").textContent()).toContain(
      "Johnny Knox"
    );

    await context.storageState({ path: messageAuthFile });
  });
});
