const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.locator("body")).toBeVisible();
  });
  test("user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "Login Toggle" }).click();
    await page.getByLabel("username").fill("priya_rai33");
    await page.getByLabel("password").fill("123456");

    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText(/logged in/i)).toBeVisible();
  });
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login Toggle" }).click();
      await page.getByLabel("username").fill("priya_rai33");
      await page.getByLabel("password").fill("123456");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.locator("#note-input").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright"),
      ).toBeVisible();
    });
  });
});
