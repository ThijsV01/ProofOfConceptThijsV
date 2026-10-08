import { test, expect } from "@playwright/test";

test("docent kan een student selecteren en ziet een lege leeslijst", async ({
  page,
}) => {
  // Arrange
  await page.goto("/login");

  await page.getByLabel("E-mailadres").fill("e2e@test.nl");
  await page.getByLabel("Wachtwoord").fill("E2ETest123");

  // Act - inloggen
  await page.getByRole("button", { name: "Inloggen" }).click();

  await expect(page).toHaveURL(/teacher/);

  // Controleer dat de studenten zichtbaar zijn
  await expect(
    page.getByRole("heading", { name: "Mijn studenten" })
  ).toBeVisible();

  // Selecteer de student
  const student = page.getByRole("button", {
    name: /E2EStudent/i,
  });

  await expect(student).toBeVisible();
  await student.click();

  // Assert - de leeslijst wordt zichtbaar
  await expect(
    page.getByRole("heading", { name: "Leeslijst" })
  ).toBeVisible();

  // De student heeft nog geen boeken
  await expect(
    page.getByText(
      "Deze student heeft momenteel geen boeken in de leeslijst."
    )
  ).toBeVisible();
});