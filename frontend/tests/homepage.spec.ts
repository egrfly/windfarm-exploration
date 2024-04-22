import { test, expect } from "@playwright/test"

test.describe("page", () => {
  test("has title", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle("Windfarm Exploration")
  })

  test("has heading", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Windfarm Exploration" })).toBeVisible()
  })
})

test.describe("map", () => {
  test("shows popup when a marker is clicked and data is retrieved", async ({ page }) => {
    await page.route(/^http:\/\/localhost:5066\/weather\?latitude=.*&longitude=.*$/, async (route) => {
      const json = {
        currentAirPressure: 1234,
        currentWindSpeed: 12.34,
        historicalAverageWindSpeed: 5.67,
      }
      await route.fulfill({ json })
    })

    await page.goto("/")

    await page.getByAltText("Marker").first().click()

    await expect(page.getByText("Current data")).toBeVisible()
    await expect(page.getByText("Wind speed: 12.34 m/s")).toBeVisible()
    await expect(page.getByText("Air pressure: 1234 hPa")).toBeVisible()
    await expect(page.getByText("Historical average")).toBeVisible()
    await expect(page.getByText("Wind speed: 5.67 m/s")).toBeVisible()
  })
})
