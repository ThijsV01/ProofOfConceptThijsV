import { test, expect } from "@playwright/test";

test("student kan zijn leeslijst bekijken", async ({ page }) => {
  // Arrange
  await page.goto("/login");

  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETestStudent123");

  // Act
  await page.getByRole("button", { name: "Inloggen" }).click();

  await expect(page).toHaveURL(/profile/);
  await page.goto("/readinglist");
  await expect(page).toHaveURL(/readinglist/);
  // Assert
  await expect(
    page.getByRole("heading", { name: "Mijn leeslijst" }),
  ).toBeVisible();

  await expect(page.getByText(/Hier vind je alle boeken die je wilt lezen/)).toBeVisible();
});

test("student kan een boek toevoegen aan de leeslijst en daarna verwijderen", async ({
  page,
}) => {
  // Arrange
  await page.goto("/login");

  await page.getByLabel("E-mailadres").fill("e2estudent@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETestStudent123");

  // Act - inloggen
  await page.getByRole("button", { name: "Inloggen" }).click();

  await expect(page).toHaveURL(/profile/);

  // Naar adviespagina
  await page.goto("/advice");
  await expect(page).toHaveURL(/advice/);
  await expect(page.getByRole("heading", { name: /advies/i })).toBeVisible();

  // Pak het eerste adviesboek
  const firstBook = page.locator(".advies-book-card").first();

  const bookTitle = await firstBook
    .getByRole("heading", { level: 2 })
    .innerText();

  // Boek toevoegen aan leeslijst
  await firstBook.getByRole("button", { name: "+ Leeslijst" }).click();

  // Controleer dat het boek daadwerkelijk is toegevoegd
  await expect(
    firstBook.getByRole("button", { name: "Op leeslijst" }),
  ).toBeVisible();

  // Naar leeslijst
  await page.goto("/readinglist");
  await expect(page).toHaveURL(/readinglist/);
  // Controleer dat het boek zichtbaar is
  await expect(
    page.getByRole("heading", { name: "Mijn leeslijst" }),
  ).toBeVisible();

  await expect(page.getByText(bookTitle)).toBeVisible();

  // Boek verwijderen
  const bookItem = page
    .locator(".reading-list-item")
    .filter({ hasText: bookTitle });

  await bookItem.getByRole("button", { name: "Verwijderen" }).click();

  await expect(bookItem.getByText(bookTitle)).not.toBeVisible();
});
