import { test, expect } from "@playwright/test";

test("student kan de catalogus filteren op Fantasy", async ({ page }) => {
  // Arrange
  await page.goto("/login");

  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETestStudent123");

  // Act
  await page.getByRole("button", { name: "Inloggen" }).click();

  await expect(page).toHaveURL(/profile/);

  await page.goto("/catalog");
 await expect(page).toHaveURL(/catalog/);
  await expect(
    page.getByRole("heading", { name: "Catalogus" })
  ).toBeVisible();

  // Filteren op Fantasy
  await page.getByLabel("Genre").selectOption("Fantasy");

  // Assert
  await expect(
    page.getByText("De Wandelaar", { exact: true }).first()
  ).toBeVisible();
});