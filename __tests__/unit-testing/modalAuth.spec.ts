import { test, expect } from "@playwright/test";

test("Should open login Modal", async ({ page }) => {
  // start from the index page (the baseURL)
  await page.goto("http://localhost:3000/");
  // Wait for selector login button
  await page.waitForSelector("text=Log In");
  // find an button element with text 'Log in' and click on it
  await page.click("text=Log In");
  // Expect the modal to be open
  const modal = await page.waitForSelector(".chakra-modal__content", {
    state: "visible",
  });
  expect(modal).toBeTruthy();
});

test("Should open signup Modal", async ({ page }) => {
  // start from the index page (the baseURL)
  await page.goto("http://localhost:3000/");
  // Wait for selector login button
  await page.waitForSelector("text=Log In");
  // find an button element with text 'signup' and click on it
  await page.click("text=Log In");
  // Expect the modal to be open
  const modal = await page.waitForSelector(".chakra-modal__content", {
    state: "visible",
  });
  expect(modal).toBeTruthy();
});
