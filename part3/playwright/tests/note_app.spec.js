const {
  test,
  expect,
  describe,
  beforeEach,
  request,
} = require("@playwright/test");
const { loginWith, createNote } = require('./helper')

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    const resetResponse = await request.post(
      "/api/testing/reset",
    );
    expect(
      resetResponse.status(),
      "Reset endpoint failed. Ensure notes-server is running on port 3001.",
    ).toBe(204);

    const userResponse = await request.post("/api/users", {
      data: {
        name: "Priya Rai",
        username: "priya_rai33",
        password: "123456",
      },
    });
    expect(userResponse.ok()).toBeTruthy();

    await page.goto("/");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(page.locator("body")).toBeVisible();
  });
  test("user can log in", async ({ page }) => {
    await loginWith(page, 'priya_rai33', '123456')

    await expect(page.getByText(/logged in/i)).toBeVisible();
  });
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'priya_rai33', '123456')
    });

    test("a new note can be created", async ({ page }) => {
     await createNote(page, 'a note created by playwright')
      const note = page
        .locator(".note")
        .filter({ hasText: "a note created by playwright" })
        .first();
      await expect(note).toBeVisible();
    });
    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        const otherNoteElement = page.getByText("second note")

        await otherNoteElement.getByRole("button", { name: "true" }).click()
        await expect(otherNoteElement.getByText("false")).toBeVisible()
    });
    });
    // test('login fails with wrong password', async ({ page }) => {
    //   await loginWith(page, 'priya_rai33', 'wrongpassword')

    //   await expect(page.getByText('wrong credentials')).toBeVisible()
    // })
  });
});
