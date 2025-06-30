import { test, expect } from "@playwright/test";

test("Test multiple windows and popups", async ({ page, context }) => {
  await page.goto("https://demoqa.com/browser-windows");
  const windowElement = page.getByRole("button", {
    name: "New Window Message",
  });
  const windowPromise = context.waitForEvent("page");

  await windowElement.scrollIntoViewIfNeeded();
  await windowElement.click();

  const newPage = await windowPromise;

  await expect(
    newPage.getByText(
      "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization."
    )
  ).toBeVisible();

  await newPage.close();
  await page.close();

});
