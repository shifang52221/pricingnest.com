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

test("api pricing calculator reacts to higher costs", async ({ page }) => {
  await page.goto("/saas-pricing/api-pricing-calculator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="callsPerMonth"]', "1000000");
  await page.fill('input[name="infraCostPer1kCalls"]', "0.1");
  await page.fill('input[name="monthlyFixedCost"]', "500");
  await page.fill('input[name="targetGrossMarginPct"]', "70");
  const priceBase = await outputValue(page, "recommendedMonthlyPrice");

  await page.fill('input[name="infraCostPer1kCalls"]', "0.2");
  const priceHigherCost = await outputValue(page, "recommendedMonthlyPrice");

  expect(priceHigherCost).toBeGreaterThan(priceBase);
});

test("api cost estimator increases with usage", async ({ page }) => {
  await page.goto("/saas-pricing/api-cost-estimator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="callsPerMonth"]', "100000");
  await page.fill('input[name="infraCostPer1kCalls"]', "0.08");
  await page.fill('input[name="vendorCostPer1kCalls"]', "0.02");
  await page.fill('input[name="monthlyFixedCost"]', "200");
  const costBase = await outputValue(page, "monthlyTotalCost");

  await page.fill('input[name="callsPerMonth"]', "200000");
  const costHigherUsage = await outputValue(page, "monthlyTotalCost");

  expect(costHigherUsage).toBeGreaterThan(costBase);
});

test("mrr calculator nets new revenue correctly", async ({ page }) => {
  await page.goto("/saas-pricing/mrr-calculator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="startingMrr"]', "10000");
  await page.fill('input[name="newMrr"]', "2000");
  await page.fill('input[name="expansionMrr"]', "500");
  await page.fill('input[name="contractionMrr"]', "300");
  await page.fill('input[name="churnedMrr"]', "700");

  const netNew = await outputValue(page, "netNewMrr");
  expect(netNew).toBe(1500);
});

test("compute cost estimator yields positive price at margin", async ({ page }) => {
  await page.goto("/saas-pricing/compute-cost-estimator/");
  await page.waitForSelector('form[data-tool-form]');

  await page.fill('input[name="vcpuHours"]', "5000");
  await page.fill('input[name="costPerVcpuHour"]', "0.02");
  await page.fill('input[name="memoryGbHours"]', "8000");
  await page.fill('input[name="costPerGbHour"]', "0.002");
  await page.fill('input[name="monthlyFixedCost"]', "250");
  await page.fill('input[name="targetGrossMarginPct"]', "70");

  const monthlyCost = await outputValue(page, "monthlyCost");
  const recommendedPrice = await outputValue(page, "recommendedMonthlyPrice");

  expect(recommendedPrice).toBeGreaterThan(monthlyCost);
});
