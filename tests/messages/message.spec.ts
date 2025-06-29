import { test, expect } from "@playwright/test";
import { createContactMessage } from "@datafactory/contactmessage";
import { registerUser } from "@datafactory/register";
import { LoginPage } from "@pages/login/login.page";
import { ContactFormPage } from "@pages/contact/contact.page";

test("Create contact message", async ({ page, context }) => {
  const email = `test${Date.now()}@gmail.com`;
  const password = "WelcomeGold23@";
  const messageAuthFile = ".auth/messageAuth.json";
  const contactPage = new ContactFormPage(page);
  const message = "I am a message used to create a contact form to submit it. I can have a minimum of 50 characters. I think 50 characters are done."

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

    //context is like a clean, isolated browser session, just like a fresh chrome window, with its own cookies, localStorage, login sessions, etc. One test = one context = one user.

    //storageState is a method on the context that lets you save the current login/session/cookie info to a file (like -.auth/user.json) or load it into a new context so you don't have to log in again.
    await context.storageState({ path: messageAuthFile });
  });

  //without create message datafactory
  await test.step("Create a message", async ()=>{
    await contactPage.goto();
    await contactPage.sendMessage(message, "Warranty");
    await contactPage.validateMessageSent();
  });
});
