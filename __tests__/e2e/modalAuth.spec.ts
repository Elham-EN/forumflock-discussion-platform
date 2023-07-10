import { test, expect } from "@playwright/test";

test("Should open login Modal", async ({ page }) => {
  // start from the index page (the baseURL)
  await page.goto("http://localhost:3000/");
  // find an button element with text 'Log in' and click on it
  await page.click("#login-button");
  // Expect the modal to be open
  const modal = await page.waitForSelector(".chakra-modal__content", {
    state: "visible",
  });
  expect(modal).toBeTruthy();
});

test("Should open signup Modal", async ({ page }) => {
  // start from the index page (the baseURL)
  await page.goto("http://localhost:3000/");
  // find an button element with text 'signup' and click on it
  await page.click("#signup-button");
  // Expect the modal to be open
  const modal = await page.waitForSelector(".chakra-modal__content", {
    state: "visible",
  });
  expect(modal).toBeTruthy();
});

test("User should be able to log in", async ({ page }) => {
  // start from the index page (the baseURL)
  await page.goto("http://localhost:3000/");
  // find an button element with text 'Log in' and click on it
  await page.click("#login-button");
  // wait for the modal to be open
  await page.waitForSelector(".chakra-modal__content", {
    state: "visible",
  });
  // fill in the email and password
  await page.fill('input[name="email"]', "ilhamrezaie35@hotmail.com");
  await page.fill('input[name="password"]', "soran123");
  // Click the login button in the modal
  await page.click("#modal-login-button");
  // Wait for navigation
  await page.waitForTimeout(2000);
  // Expect the "Log In" button to be disappeared
  const isLoginButtonVisible = await page.isVisible("text=Log In");
  expect(isLoginButtonVisible).toBe(false);
});
