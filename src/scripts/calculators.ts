type Inputs = Record<string, string>;

type CalcResult = Record<string, number | string>;

function toNumber(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clampPercent(percent: number): number {
  if (!Number.isFinite(percent)) return 0;
  return Math.min(99.9, Math.max(0, percent));
}

export function compute(slug: string, inputs: Inputs): CalcResult {
  switch (slug) {
    case "usage-based-pricing-calculator": {
      const monthlyUnits = Math.max(0, toNumber(inputs.monthlyUnits));
      const unitCost = Math.max(0, toNumber(inputs.unitCost));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const fixedPerUnit = monthlyUnits > 0 ? monthlyFixedCost / monthlyUnits : 0;
      const costPerUnitAllIn = unitCost + fixedPerUnit;
      const requiredUnitPrice = margin >= 1 ? 0 : costPerUnitAllIn / (1 - margin);

      const monthlyRevenue = requiredUnitPrice * monthlyUnits;
      const monthlyCost = unitCost * monthlyUnits + monthlyFixedCost;
      const monthlyGrossProfit = monthlyRevenue - monthlyCost;
      const grossMarginPct = monthlyRevenue > 0 ? (monthlyGrossProfit / monthlyRevenue) * 100 : 0;

      return { requiredUnitPrice, monthlyRevenue, monthlyGrossProfit, grossMarginPct };
    }
    case "seat-vs-usage-pricing-comparison": {
      const seats = Math.max(0, toNumber(inputs.seats));
      const seatPrice = Math.max(0, toNumber(inputs.seatPrice));
      const monthlyUnits = Math.max(0, toNumber(inputs.monthlyUnits));
      const unitPrice = Math.max(0, toNumber(inputs.unitPrice));

      const seatModelCost = seats * seatPrice;
      const usageModelCost = monthlyUnits * unitPrice;
      const difference = seatModelCost - usageModelCost;
      const cheaperModel =
        seatModelCost === usageModelCost ? "Same" : seatModelCost < usageModelCost ? "Seat-based" : "Usage-based";

      return { seatModelCost, usageModelCost, difference, cheaperModel };
    }
    case "api-pricing-calculator": {
      const callsPerMonth = Math.max(0, toNumber(inputs.callsPerMonth));
      const infraCostPer1kCalls = Math.max(0, toNumber(inputs.infraCostPer1kCalls));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const variableCost = (callsPerMonth / 1000) * infraCostPer1kCalls;
      const monthlyCost = variableCost + monthlyFixedCost;
      const recommendedMonthlyPrice = margin >= 1 ? 0 : monthlyCost / (1 - margin);
      const pricePer1kCalls = callsPerMonth > 0 ? (recommendedMonthlyPrice / callsPerMonth) * 1000 : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return { monthlyCost, recommendedMonthlyPrice, pricePer1kCalls, grossMarginPct };
    }
    case "api-cost-estimator": {
      const callsPerMonth = Math.max(0, toNumber(inputs.callsPerMonth));
      const infraCostPer1kCalls = Math.max(0, toNumber(inputs.infraCostPer1kCalls));
      const vendorCostPer1kCalls = Math.max(0, toNumber(inputs.vendorCostPer1kCalls));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));

      const monthlyInfraCost = (callsPerMonth / 1000) * infraCostPer1kCalls;
      const monthlyVendorCost = (callsPerMonth / 1000) * vendorCostPer1kCalls;
      const monthlyVariableCost = monthlyInfraCost + monthlyVendorCost;
      const monthlyTotalCost = monthlyVariableCost + monthlyFixedCost;

      const costPerCall = callsPerMonth > 0 ? monthlyTotalCost / callsPerMonth : 0;
      const costPer1kCalls = callsPerMonth > 0 ? costPerCall * 1000 : 0;

      return { monthlyTotalCost, costPerCall, costPer1kCalls, monthlyVariableCost };
    }
    case "price-per-gb-month-calculator": {
      const avgGbStored = Math.max(0, toNumber(inputs.avgGbStored));
      const costPerGbMonth = Math.max(0, toNumber(inputs.costPerGbMonth));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const monthlyCost = avgGbStored * costPerGbMonth + monthlyFixedCost;
      const recommendedMonthlyPrice = margin >= 1 ? 0 : monthlyCost / (1 - margin);
      const recommendedPricePerGbMonth = avgGbStored > 0 ? recommendedMonthlyPrice / avgGbStored : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return { recommendedPricePerGbMonth, recommendedMonthlyPrice, monthlyCost, grossMarginPct };
    }
    case "tiered-usage-pricing-calculator": {
      const monthlyUnits = Math.max(0, toNumber(inputs.monthlyUnits));
      const baseFee = Math.max(0, toNumber(inputs.baseFee));
      const includedUnits = Math.max(0, toNumber(inputs.includedUnits));
      const tier1Units = Math.max(0, toNumber(inputs.tier1Units));
      const tier1PricePerUnit = Math.max(0, toNumber(inputs.tier1PricePerUnit));
      const tier2Units = Math.max(0, toNumber(inputs.tier2Units));
      const tier2PricePerUnit = Math.max(0, toNumber(inputs.tier2PricePerUnit));
      const tier3PricePerUnit = Math.max(0, toNumber(inputs.tier3PricePerUnit));

      const overageUnits = Math.max(0, monthlyUnits - includedUnits);
      const tier1Billed = Math.min(overageUnits, tier1Units);
      const tier2Billed = Math.min(Math.max(0, overageUnits - tier1Units), tier2Units);
      const tier3Billed = Math.max(0, overageUnits - tier1Units - tier2Units);
      const overageCost = tier1Billed * tier1PricePerUnit + tier2Billed * tier2PricePerUnit + tier3Billed * tier3PricePerUnit;

      const monthlyBill = baseFee + overageCost;
      const blendedOverageRate = overageUnits > 0 ? overageCost / overageUnits : 0;
      const effectivePricePerUnit = monthlyUnits > 0 ? monthlyBill / monthlyUnits : 0;

      return { monthlyBill, overageUnits, blendedOverageRate, effectivePricePerUnit };
    }
    case "bandwidth-cost-calculator": {
      const gbPerMonth = Math.max(0, toNumber(inputs.gbPerMonth));
      const costPerGb = Math.max(0, toNumber(inputs.costPerGb));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const variableCost = gbPerMonth * costPerGb;
      const monthlyCost = variableCost + monthlyFixedCost;
      const recommendedMonthlyPrice = margin >= 1 ? 0 : monthlyCost / (1 - margin);
      const effectivePricePerGb = gbPerMonth > 0 ? recommendedMonthlyPrice / gbPerMonth : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return { monthlyCost, recommendedMonthlyPrice, effectivePricePerGb, grossMarginPct };
    }
    case "compute-cost-estimator": {
      const vcpuHours = Math.max(0, toNumber(inputs.vcpuHours));
      const costPerVcpuHour = Math.max(0, toNumber(inputs.costPerVcpuHour));
      const memoryGbHours = Math.max(0, toNumber(inputs.memoryGbHours));
      const costPerGbHour = Math.max(0, toNumber(inputs.costPerGbHour));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const variableCost = vcpuHours * costPerVcpuHour + memoryGbHours * costPerGbHour;
      const monthlyCost = variableCost + monthlyFixedCost;
      const recommendedMonthlyPrice = margin >= 1 ? 0 : monthlyCost / (1 - margin);
      const effectivePricePerVcpuHour = vcpuHours > 0 ? recommendedMonthlyPrice / vcpuHours : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return { monthlyCost, recommendedMonthlyPrice, effectivePricePerVcpuHour, grossMarginPct };
    }
    case "monthly-cloud-cost-estimator": {
      const computeCost = Math.max(0, toNumber(inputs.computeCost));
      const storageCost = Math.max(0, toNumber(inputs.storageCost));
      const bandwidthCost = Math.max(0, toNumber(inputs.bandwidthCost));
      const otherCost = Math.max(0, toNumber(inputs.otherCost));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));

      const variableCost = computeCost + storageCost + bandwidthCost + otherCost;
      const fixedCost = monthlyFixedCost;
      const monthlyCloudCost = variableCost + fixedCost;

      return { monthlyCloudCost, variableCost, fixedCost };
    }
    case "mrr-calculator": {
      const startingMrr = Math.max(0, toNumber(inputs.startingMrr));
      const newMrr = Math.max(0, toNumber(inputs.newMrr));
      const expansionMrr = Math.max(0, toNumber(inputs.expansionMrr));
      const contractionMrr = Math.max(0, toNumber(inputs.contractionMrr));
      const churnedMrr = Math.max(0, toNumber(inputs.churnedMrr));

      const endingMrr = startingMrr + newMrr + expansionMrr - contractionMrr - churnedMrr;
      const netNewMrr = endingMrr - startingMrr;
      const mrrGrowthPct = startingMrr > 0 ? (netNewMrr / startingMrr) * 100 : 0;

      return { endingMrr, netNewMrr, mrrGrowthPct };
    }
    case "nrr-calculator": {
      const startingMrr = Math.max(0, toNumber(inputs.startingMrr));
      const expansionMrr = Math.max(0, toNumber(inputs.expansionMrr));
      const contractionMrr = Math.max(0, toNumber(inputs.contractionMrr));
      const churnedMrr = Math.max(0, toNumber(inputs.churnedMrr));

      const endingMrr = startingMrr + expansionMrr - contractionMrr - churnedMrr;
      const netRevenueDelta = endingMrr - startingMrr;
      const nrrPct = startingMrr > 0 ? (endingMrr / startingMrr) * 100 : 0;

      return { endingMrr, netRevenueDelta, nrrPct };
    }
    case "arr-calculator": {
      const mrr = Math.max(0, toNumber(inputs.mrr));
      const arr = mrr * 12;
      return { arr };
    }
    case "churn-impact-calculator": {
      const mrr = Math.max(0, toNumber(inputs.mrr));
      const monthlyChurnPct = clampPercent(toNumber(inputs.monthlyChurnPct));

      const monthlyChurnedRevenue = mrr * (monthlyChurnPct / 100);
      const annualChurnedRevenue = monthlyChurnedRevenue * 12;

      return { monthlyChurnedRevenue, annualChurnedRevenue };
    }
    case "cohort-retention-curve-calculator": {
      const cohortSize = Math.max(0, toNumber(inputs.cohortSize));
      const monthlyRetentionPct = clampPercent(toNumber(inputs.monthlyRetentionPct));
      const rate = monthlyRetentionPct / 100;

      const month1RetentionPct = Math.pow(rate, 1) * 100;
      const month2RetentionPct = Math.pow(rate, 2) * 100;
      const month3RetentionPct = Math.pow(rate, 3) * 100;
      const month4RetentionPct = Math.pow(rate, 4) * 100;
      const month5RetentionPct = Math.pow(rate, 5) * 100;
      const month6RetentionPct = Math.pow(rate, 6) * 100;
      const month6Users = cohortSize * Math.pow(rate, 6);

      return {
        month1RetentionPct,
        month2RetentionPct,
        month3RetentionPct,
        month4RetentionPct,
        month5RetentionPct,
        month6RetentionPct,
        month6Users
      };
    }
    case "ltv-calculator": {
      const arpa = Math.max(0, toNumber(inputs.arpa));
      const grossMarginPct = clampPercent(toNumber(inputs.grossMarginPct));
      const monthlyChurnPct = clampPercent(toNumber(inputs.monthlyChurnPct));

      const churnRate = monthlyChurnPct / 100;
      const avgLifetimeMonths = churnRate > 0 ? 1 / churnRate : 0;
      const ltv = arpa * (grossMarginPct / 100) * avgLifetimeMonths;

      return { ltv, avgLifetimeMonths };
    }
    case "cac-payback-period-calculator": {
      const cac = Math.max(0, toNumber(inputs.cac));
      const arpa = Math.max(0, toNumber(inputs.arpa));
      const grossMarginPct = clampPercent(toNumber(inputs.grossMarginPct));

      const grossProfitPerMonth = arpa * (grossMarginPct / 100);
      const paybackMonths = grossProfitPerMonth > 0 ? cac / grossProfitPerMonth : 0;

      return { paybackMonths, grossProfitPerMonth };
    }
    case "break-even-cac-calculator": {
      const arpa = Math.max(0, toNumber(inputs.arpa));
      const grossMarginPct = clampPercent(toNumber(inputs.grossMarginPct));
      const monthlyChurnPct = clampPercent(toNumber(inputs.monthlyChurnPct));
      const targetPaybackMonths = Math.max(0, toNumber(inputs.targetPaybackMonths));

      const grossProfitPerMonth = arpa * (grossMarginPct / 100);
      const breakEvenCac = grossProfitPerMonth * targetPaybackMonths;

      const churnRate = monthlyChurnPct / 100;
      const avgLifetimeMonths = churnRate > 0 ? 1 / churnRate : 0;
      const ltv = arpa * (grossMarginPct / 100) * avgLifetimeMonths;
      const ltvToCac = breakEvenCac > 0 ? ltv / breakEvenCac : 0;

      return { breakEvenCac, ltv, ltvToCac };
    }
    case "pricing-increase-impact-calculator": {
      const currentPrice = Math.max(0, toNumber(inputs.currentPrice));
      const customers = Math.max(0, toNumber(inputs.customers));
      const priceIncreasePct = clampPercent(toNumber(inputs.priceIncreasePct));
      const expectedChurnPct = clampPercent(toNumber(inputs.expectedChurnPct));

      const revenueBefore = customers * currentPrice;
      const newPrice = currentPrice * (1 + priceIncreasePct / 100);
      const remainingCustomers = customers * (1 - expectedChurnPct / 100);
      const revenueAfter = remainingCustomers * newPrice;
      const deltaRevenue = revenueAfter - revenueBefore;

      const breakEvenChurnPct = newPrice > 0 ? (1 - revenueBefore / (customers * newPrice)) * 100 : 0;

      return { revenueBefore, revenueAfter, deltaRevenue, breakEvenChurnPct };
    }
    case "annual-discount-calculator": {
      const monthlyPrice = Math.max(0, toNumber(inputs.monthlyPrice));
      const annualDiscountPct = clampPercent(toNumber(inputs.annualDiscountPct));

      const annualPrice = monthlyPrice * 12 * (1 - annualDiscountPct / 100);
      const effectiveMonthly = annualPrice / 12;
      const annualSavings = monthlyPrice * 12 - annualPrice;

      return { annualPrice, effectiveMonthly, annualSavings };
    }
    case "pricing-tier-optimizer": {
      const targetArpa = Math.max(0, toNumber(inputs.targetArpa));
      const basicSharePct = clampPercent(toNumber(inputs.basicSharePct));
      const proSharePct = clampPercent(toNumber(inputs.proSharePct));
      const enterpriseSharePct = clampPercent(toNumber(inputs.enterpriseSharePct));
      const proMultiplier = Math.max(0, toNumber(inputs.proMultiplier));
      const enterpriseMultiplier = Math.max(0, toNumber(inputs.enterpriseMultiplier));

      const shareTotal = basicSharePct + proSharePct + enterpriseSharePct;
      const basicShare = shareTotal > 0 ? basicSharePct / shareTotal : 0;
      const proShare = shareTotal > 0 ? proSharePct / shareTotal : 0;
      const enterpriseShare = shareTotal > 0 ? enterpriseSharePct / shareTotal : 0;
      const denominator = basicShare + proShare * proMultiplier + enterpriseShare * enterpriseMultiplier;

      const basicPrice = denominator > 0 ? targetArpa / denominator : 0;
      const proPrice = basicPrice * proMultiplier;
      const enterprisePrice = basicPrice * enterpriseMultiplier;
      const impliedArpa = basicPrice * denominator;

      return { basicPrice, proPrice, enterprisePrice, impliedArpa };
    }
    case "storage-cost-calculator": {
      const avgGbStored = Math.max(0, toNumber(inputs.avgGbStored));
      const costPerGbMonth = Math.max(0, toNumber(inputs.costPerGbMonth));
      const requestsPerMonth = Math.max(0, toNumber(inputs.requestsPerMonth));
      const costPer10kRequests = Math.max(0, toNumber(inputs.costPer10kRequests));
      const monthlyFixedCost = Math.max(0, toNumber(inputs.monthlyFixedCost));
      const targetGrossMarginPct = clampPercent(toNumber(inputs.targetGrossMarginPct));
      const margin = targetGrossMarginPct / 100;

      const storageCost = avgGbStored * costPerGbMonth;
      const requestCost = (requestsPerMonth / 10000) * costPer10kRequests;
      const monthlyCost = storageCost + requestCost + monthlyFixedCost;
      const recommendedMonthlyPrice = margin >= 1 ? 0 : monthlyCost / (1 - margin);
      const effectivePricePerGb = avgGbStored > 0 ? recommendedMonthlyPrice / avgGbStored : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return { monthlyCost, recommendedMonthlyPrice, effectivePricePerGb, grossMarginPct };
    }
    default:
      return {};
  }
}
