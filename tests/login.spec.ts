import { test, expect } from "@playwright/test";

test("student kan succesvol inloggen", async ({ page }) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETestStudent123");

  await page.getByRole("button", { name: "Inloggen" }).click();

  // Assert
  await expect(page).toHaveURL(/profile/);
});

test("docent kan succesvol inloggen", async ({ page }) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("E-mailadres").fill("e2e@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETest123");

  await page.getByRole("button", { name: "Inloggen" }).click();

  // Assert
  await expect(page).toHaveURL(/teacher/);
});

test("student krijgt een foutmelding bij verkeerde inloggegevens", async ({
  page,
}) => {
  // Arrange
  await page.goto("/login");

  // Act
  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("verkeerd-wachtwoord");

  await page.getByRole("button", { name: "Inloggen" }).click();

  // Assert
  await expect(
    page.getByText("Ongeldige inloggegevens"),
  ).toBeVisible();

  await expect(page).toHaveURL(/login/);
});