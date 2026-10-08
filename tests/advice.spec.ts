import { test, expect } from "@playwright/test";

test("student kan zijn leesadvies bekijken", async ({ page }) => {
  // Arrange
  await page.goto("/login");

  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETestStudent123");

  // Act
  await page.getByRole("button", { name: "Inloggen" }).click();

  await expect(page).toHaveURL(/profile/);

  await page.goto("/advice");

  // Assert
  await expect(page.getByRole("heading", { name: /advies/i })).toBeVisible();

  await expect(page.getByText("Moordgids voor lieve meisjes")).toBeVisible();
});