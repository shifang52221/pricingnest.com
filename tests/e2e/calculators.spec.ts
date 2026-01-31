import { expect, test } from "@playwright/test";

const parseNumber = (raw: string) => {
  const normalized = raw.replace(/[^0-9.-]+/g, "");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
};

const outputValue = async (page: any, name: string) => {
  const row = page.locator(`[data-output="${name}"]`);
  await expect(row).toHaveCount(1);
  const text = await row.locator("[data-output-value]").innerText();
  return parseNumber(text);
};

test("usage-based calculator updates outputs, compare, sensitivity, and share link", async ({ page }) => {
  await page.goto("/saas-pricing/usage-based-pricing-calculator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="monthlyUnits"]', "200000");
  await page.fill('input[name="unitCost"]', "0.0003");

  const shareLink = page.locator("[data-share-link]");
  await expect(shareLink).toContainText("monthlyUnits=200000");

  await page.click("button[data-compare-save]");
  await page.fill('input[name="monthlyUnits"]', "250000");

  const compareDelta = page.locator('[data-compare-output="requiredUnitPrice"] [data-compare-delta]');
  await expect(compareDelta).not.toHaveText("-");

  await page.selectOption("select[data-sensitivity-input]", "monthlyUnits");
  await page.selectOption("select[data-sensitivity-range]", "25");

  const sensitivityLow = page.locator('[data-sensitivity-output="monthlyRevenue"] [data-sensitivity-low]');
  const sensitivityHigh = page.locator('[data-sensitivity-output="monthlyRevenue"] [data-sensitivity-high]');
  await expect(sensitivityLow).not.toHaveText("-");
  await expect(sensitivityHigh).not.toHaveText("-");
});

test("tiered usage calculator handles included units correctly", async ({ page }) => {
  await page.goto("/saas-pricing/tiered-usage-pricing-calculator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="monthlyUnits"]', "50");
  await page.fill('input[name="includedUnits"]', "100");
  await page.fill('input[name="baseFee"]', "0");
  await page.fill('input[name="tier1Units"]', "100");
  await page.fill('input[name="tier1PricePerUnit"]', "0.01");
  await page.fill('input[name="tier2Units"]', "100");
  await page.fill('input[name="tier2PricePerUnit"]', "0.02");
  await page.fill('input[name="tier3PricePerUnit"]', "0.03");

  const overage = await outputValue(page, "overageUnits");
  expect(overage).toBe(0);
});

test("ltv calculator decreases with higher churn", async ({ page }) => {
  await page.goto("/saas-pricing/ltv-calculator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="arpa"]', "100");
  await page.fill('input[name="grossMarginPct"]', "80");
  await page.fill('input[name="monthlyChurnPct"]', "2");
  const ltvLowChurn = await outputValue(page, "ltv");

  await page.fill('input[name="monthlyChurnPct"]', "10");
  const ltvHighChurn = await outputValue(page, "ltv");

  expect(ltvLowChurn).toBeGreaterThan(ltvHighChurn);
});
