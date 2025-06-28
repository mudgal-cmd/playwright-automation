import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://practicesoftwaretesting.com/');
  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('register-link').click();

  await page.getByTestId('first-name').fill('test');

  await page.getByTestId('last-name').fill('testlname');
  await page.getByTestId('dob').fill('2000-12-12');

  await page.getByTestId('street').fill('1 street');

  await page.getByTestId('postal_code').fill('34211');

  await page.getByTestId('city').fill('city');

  await page.getByTestId('state').fill('state');
  await page.getByTestId('country').selectOption('US');

  await page.getByTestId('phone').fill('9087654321');
  await page.getByTestId('email').fill('testnm67@gmail.com');
  await page.getByTestId('password').fill('asdWQ1234@');
  await page.getByTestId('register-submit').click();
});