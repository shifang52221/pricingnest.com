function toNumber(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return 0;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clampPercent(percent) {
  if (!Number.isFinite(percent)) return 0;
  return Math.min(99.9, Math.max(0, percent));
}

function compute(slug, inputs) {
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
      const overageCost =
        tier1Billed * tier1PricePerUnit + tier2Billed * tier2PricePerUnit + tier3Billed * tier3PricePerUnit;

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
      const effectivePricePerGbHour = memoryGbHours > 0 ? recommendedMonthlyPrice / memoryGbHours : 0;
      const grossMarginPct =
        recommendedMonthlyPrice > 0 ? ((recommendedMonthlyPrice - monthlyCost) / recommendedMonthlyPrice) * 100 : 0;

      return {
        monthlyCost,
        recommendedMonthlyPrice,
        effectivePricePerVcpuHour,
        effectivePricePerGbHour,
        grossMarginPct
      };
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

function qs(root, selector) {
  return root.querySelector(selector);
}

function qsa(root, selector) {
  return Array.from(root.querySelectorAll(selector));
}

function formatCurrency(currency, value) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: value < 1 ? 6 : 2
  });
  return formatter.format(value);
}

function formatNumber(value) {
  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 });
  return formatter.format(value);
}

function formatPercent(value) {
  const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  return `${formatter.format(value)}%`;
}

function readInputs(form) {
  const inputs = {};
  for (const element of Array.from(form.elements)) {
    if (
      !(
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      )
    )
      continue;
    const name = element.name;
    if (!name) continue;
    inputs[name] = element.value;
  }
  return inputs;
}

function formatInputValue(value) {
  const rounded = Math.round(value * 1000000) / 1000000;
  return String(rounded);
}

function setInputsFromQuery(form) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    const el = form.elements.namedItem(key);
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
    }
  }
}

function buildShareUrl(form) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams();
  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    if (!element.name) continue;
    params.set(element.name, element.value);
  }
  url.search = params.toString();
  return url.toString();
}

function resetToDefaults(form) {
  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) continue;
    const defaultValue = element.getAttribute("data-default");
    if (defaultValue == null) continue;
    element.value = defaultValue;
  }
}

function getPresets(root) {
  const script = root.querySelector("script[data-presets]");
  if (!script) return [];
  try {
    const text = script.textContent ?? "[]";
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function applyPreset(form, preset) {
  for (const [name, value] of Object.entries(preset.values)) {
    const el = form.elements.namedItem(name);
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
    }
  }
}

function escapeCsv(value) {
  const normalized = String(value ?? "")
    .replace(/\r?\n/g, " ")
    .trim();
  if (/[",]/.test(normalized)) return `"${normalized.replace(/"/g, '""')}"`;
  return normalized;
}

function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildCsvReport(root, form) {
  const inputs = readInputs(form);
  const lines = [];
  lines.push("Section,Field,Value");

  for (const [name, value] of Object.entries(inputs)) {
    const labelText =
      (root.querySelector(`label[for=\"${CSS.escape(name)}\"]`)?.textContent ?? name).trim() || name;
    lines.push(["Inputs", labelText, value].map(escapeCsv).join(","));
  }

  for (const row of qsa(root, "[data-output]")) {
    const label = (qs(row, ".label")?.textContent ?? row.getAttribute("data-output") ?? "").trim();
    const value = (qs(row, "[data-output-value]")?.textContent ?? "").trim();
    lines.push(["Outputs", label, value].map(escapeCsv).join(","));
  }

  return lines.join("\n");
}

function renderOutputs(root, currency, result) {
  const outputRows = qsa(root, "[data-output]");
  const numericOutputs = [];

  for (const row of outputRows) {
    const outputName = row.getAttribute("data-output");
    const format = row.getAttribute("data-format") ?? "text";
    const valueEl = qs(row, "[data-output-value]");
    if (!outputName || !valueEl) continue;

    const value = result[outputName];
    if (typeof value === "number" && Number.isFinite(value)) {
      numericOutputs.push({ name: outputName, value, format });
    }

    if (typeof value === "number") {
      if (format === "currency") valueEl.textContent = formatCurrency(currency, value);
      else if (format === "percent") valueEl.textContent = formatPercent(value);
      else valueEl.textContent = formatNumber(value);
    } else {
      valueEl.textContent = value == null ? "" : String(value);
    }
  }

  if (numericOutputs.length > 0) {
    const minValue = Math.min(...numericOutputs.map((o) => o.value));
    const maxValue = Math.max(...numericOutputs.map((o) => o.value));
    const span = maxValue - minValue || 1;

    for (const output of numericOutputs) {
      const row = qs(root, `[data-sparkline=\"${CSS.escape(output.name)}\"]`);
      if (!row) continue;
      const bar = qs(row, "[data-sparkline-bar]");
      const label = qs(row, "[data-sparkline-label]");
      const pct = ((output.value - minValue) / span) * 100;
      if (bar) bar.style.width = `${Math.max(6, Math.min(100, pct))}%`;
      if (label) label.textContent = formatValue(output.format, currency, output.value);
    }
  }
}

function renderInsights(root, slug, inputs, result) {
  const container = qs(root, "[data-insights]");
  if (!container) return;

  const insights = [];
  const targetMargin = toNumber(inputs.targetGrossMarginPct);
  const grossMargin = typeof result.grossMarginPct === "number" ? result.grossMarginPct : null;
  const monthlyCost = typeof result.monthlyCost === "number" ? result.monthlyCost : null;
  const recommendedPrice =
    typeof result.recommendedMonthlyPrice === "number" ? result.recommendedMonthlyPrice : null;
  const paybackMonths = typeof result.paybackMonths === "number" ? result.paybackMonths : null;
  const targetPayback = toNumber(inputs.targetPaybackMonths);
  const ltvToCac = typeof result.ltvToCac === "number" ? result.ltvToCac : null;

  if (grossMargin != null && targetMargin > 0) {
    const delta = grossMargin - targetMargin;
    if (delta < -0.5) {
      insights.push({
        level: "warn",
        text: `Gross margin is ${formatNumber(grossMargin)}% which is below target by ${formatSignedNumber(delta)}%.`
      });
    } else {
      insights.push({
        level: "good",
        text: `Gross margin is ${formatNumber(grossMargin)}% and meets the target of ${formatNumber(targetMargin)}%.`
      });
    }
  }

  if (monthlyCost != null && recommendedPrice != null && recommendedPrice > 0) {
    const margin = ((recommendedPrice - monthlyCost) / recommendedPrice) * 100;
    if (margin < 50) {
      insights.push({
        level: "warn",
        text: `Implied margin is ${formatNumber(margin)}%. Consider a base fee or higher unit price.`
      });
    }
  }

  if (paybackMonths != null && targetPayback > 0) {
    if (paybackMonths > targetPayback) {
      insights.push({
        level: "warn",
        text: `Payback is ${formatNumber(paybackMonths)} months vs target ${formatNumber(targetPayback)}.`
      });
    } else {
      insights.push({
        level: "good",
        text: `Payback is ${formatNumber(paybackMonths)} months and meets the target.`
      });
    }
  }

  if (ltvToCac != null && ltvToCac > 0) {
    if (ltvToCac < 2) {
      insights.push({
        level: "warn",
        text: `LTV:CAC is ${formatNumber(ltvToCac)}. Improve retention or margin.`
      });
    } else if (ltvToCac >= 3) {
      insights.push({
        level: "good",
        text: `LTV:CAC is ${formatNumber(ltvToCac)} which is healthy for most SaaS models.`
      });
    } else {
      insights.push({
        level: "note",
        text: `LTV:CAC is ${formatNumber(ltvToCac)}. Consider improving payback efficiency.`
      });
    }
  }

  if (insights.length === 0) {
    insights.push({
      level: "note",
      text: "Adjust inputs to generate margin, payback, or efficiency insights."
    });
  }

  container.innerHTML = "";
  for (const insight of insights) {
    const item = document.createElement("div");
    item.className = "insight";
    item.dataset.level = insight.level;
    item.textContent = insight.text;
    container.appendChild(item);
  }
}

function formatValue(format, currency, value) {
  if (typeof value !== "number") return value == null ? "" : String(value);
  if (format === "currency") return formatCurrency(currency, value);
  if (format === "percent") return formatPercent(value);
  if (format === "number") return formatNumber(value);
  return String(value);
}

function formatSignedNumber(value) {
  if (!Number.isFinite(value)) return "0";
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatNumber(Math.abs(value))}`;
}

function getCompareKey(slug) {
  return `pn_compare_${slug}`;
}

function loadBaseline(slug) {
  try {
    const raw = localStorage.getItem(getCompareKey(slug));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.inputs) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveBaseline(slug, inputs) {
  const payload = { savedAt: Date.now(), inputs };
  try {
    localStorage.setItem(getCompareKey(slug), JSON.stringify(payload));
  } catch {
    return;
  }
}

function clearBaseline(slug) {
  try {
    localStorage.removeItem(getCompareKey(slug));
  } catch {
    return;
  }
}

function renderCompare(root, slug, inputs) {
  const baseline = loadBaseline(slug);
  const note = qs(root, "[data-compare-note]");
  if (!baseline || !baseline.inputs) {
    if (note) note.textContent = "Save a baseline to see deltas for every output.";
    for (const row of qsa(root, "[data-compare-output]")) {
      const baseEl = qs(row, "[data-compare-baseline]");
      const deltaEl = qs(row, "[data-compare-delta]");
      if (baseEl) baseEl.textContent = "-";
      if (deltaEl) deltaEl.textContent = "-";
    }
    return;
  }

  if (note) {
    const stamp = new Date(baseline.savedAt);
    note.textContent = `Baseline saved ${stamp.toLocaleString()}.`;
  }

  const baselineResult = compute(slug, baseline.inputs);
  const currentResult = compute(slug, inputs);
  const currency = inputs.currency || "USD";

  for (const row of qsa(root, "[data-compare-output]")) {
    const outputName = row.getAttribute("data-compare-output");
    const format = row.getAttribute("data-format") ?? "text";
    const baseEl = qs(row, "[data-compare-baseline]");
    const deltaEl = qs(row, "[data-compare-delta]");
    if (!outputName || !baseEl || !deltaEl) continue;

    const baseVal = baselineResult[outputName];
    const currentVal = currentResult[outputName];
    baseEl.textContent = formatValue(format, currency, baseVal);

    if (typeof baseVal === "number" && typeof currentVal === "number") {
      const delta = currentVal - baseVal;
      const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
      deltaEl.textContent = `${sign}${formatValue(format, currency, Math.abs(delta))}`;
      deltaEl.dataset.delta = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
    } else {
      deltaEl.textContent = "-";
      deltaEl.dataset.delta = "flat";
    }
  }
}

function renderSensitivity(root, slug, inputs) {
  const inputSelect = qs(root, "select[data-sensitivity-input]");
  const rangeSelect = qs(root, "select[data-sensitivity-range]");
  if (!(inputSelect instanceof HTMLSelectElement) || !(rangeSelect instanceof HTMLSelectElement)) return;

  const targetName = inputSelect.value;
  const deltaPct = Math.max(0, toNumber(rangeSelect.value));
  const delta = deltaPct / 100;
  const baseValueRaw = inputs[targetName];
  const baseValue = toNumber(baseValueRaw);
  const lowValue = Math.max(0, baseValue * (1 - delta));
  const highValue = Math.max(0, baseValue * (1 + delta));

  const lowInputs = { ...inputs, [targetName]: String(lowValue) };
  const highInputs = { ...inputs, [targetName]: String(highValue) };

  const currency = inputs.currency || "USD";
  const baseResult = compute(slug, inputs);
  const lowResult = compute(slug, lowInputs);
  const highResult = compute(slug, highInputs);

  const note = qs(root, "[data-sensitivity-note]");
  if (note) {
    const label = inputSelect.options[inputSelect.selectedIndex]?.textContent ?? targetName;
    note.textContent = `${label}: ${formatNumber(baseValue)} with ${deltaPct}% range.`;
  }

  for (const row of qsa(root, "[data-sensitivity-output]")) {
    const outputName = row.getAttribute("data-sensitivity-output");
    const format = row.getAttribute("data-format") ?? "text";
    const lowEl = qs(row, "[data-sensitivity-low]");
    const baseEl = qs(row, "[data-sensitivity-base]");
    const highEl = qs(row, "[data-sensitivity-high]");
    if (!outputName || !lowEl || !baseEl || !highEl) continue;

    lowEl.textContent = formatValue(format, currency, lowResult[outputName]);
    baseEl.textContent = formatValue(format, currency, baseResult[outputName]);
    highEl.textContent = formatValue(format, currency, highResult[outputName]);
  }
}

function setupToolPage(root) {
  const slug = root.getAttribute("data-tool");
  if (!slug) return;

  const form = qs(root, "form[data-tool-form]");
  if (!(form instanceof HTMLFormElement)) return;

  setInputsFromQuery(form);

  const shareLinkEl = qs(root, "[data-share-link]");
  const copyBtn = qs(root, "button[data-copy-share]");
  const resetBtn = qs(root, "button[data-reset]");
  const presetSelect = root.querySelector("select[data-presets-select]");
  const downloadBtn = qs(root, "button[data-download-csv]");
  const compareSaveBtn = qs(root, "button[data-compare-save]");
  const compareClearBtn = qs(root, "button[data-compare-clear]");
  const sensitivityInput = qs(root, "select[data-sensitivity-input]");
  const sensitivityRange = qs(root, "select[data-sensitivity-range]");
  const scenarioInput = qs(root, "select[data-scenario-input]");
  const scenarioButtons = qsa(root, "button[data-scenario]");

  const recompute = () => {
    const inputs = readInputs(form);
    const currency = inputs.currency || "USD";
    const result = compute(slug, inputs);
    renderOutputs(root, currency, result);
    renderInsights(root, slug, inputs, result);
    renderCompare(root, slug, inputs);
    renderSensitivity(root, slug, inputs);
    if (shareLinkEl) shareLinkEl.textContent = buildShareUrl(form);
  };

  form.addEventListener("input", recompute);
  form.addEventListener("change", recompute);
  recompute();

  if (resetBtn instanceof HTMLButtonElement) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetToDefaults(form);
      if (presetSelect instanceof HTMLSelectElement) presetSelect.value = "";
      recompute();
    });
  }

  if (presetSelect instanceof HTMLSelectElement) {
    const presets = getPresets(root);
    presetSelect.addEventListener("change", () => {
      const selected = presetSelect.value;
      const preset = presets.find((p) => p.label === selected);
      if (!preset) return;
      applyPreset(form, preset);
      recompute();
    });
  }

  if (downloadBtn instanceof HTMLButtonElement) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const csv = buildCsvReport(root, form);
      downloadCsv(`${slug}.csv`, csv);
    });
  }

  if (copyBtn instanceof HTMLButtonElement) {
    copyBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const shareUrl = buildShareUrl(form);
      try {
        await navigator.clipboard.writeText(shareUrl);
        copyBtn.textContent = "Copied";
      } catch {
        window.prompt("Copy this link:", shareUrl);
      } finally {
        window.setTimeout(() => {
          copyBtn.textContent = "Copy share link";
        }, 1200);
      }
    });
  }

  if (compareSaveBtn instanceof HTMLButtonElement) {
    compareSaveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const inputs = readInputs(form);
      saveBaseline(slug, inputs);
      renderCompare(root, slug, inputs);
      compareSaveBtn.textContent = "Baseline saved";
      window.setTimeout(() => {
        compareSaveBtn.textContent = "Save baseline";
      }, 1200);
    });
  }

  if (compareClearBtn instanceof HTMLButtonElement) {
    compareClearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearBaseline(slug);
      renderCompare(root, slug, readInputs(form));
    });
  }

  if (sensitivityInput instanceof HTMLSelectElement) {
    sensitivityInput.addEventListener("change", recompute);
  }

  if (sensitivityRange instanceof HTMLSelectElement) {
    sensitivityRange.addEventListener("change", recompute);
  }

  if (scenarioInput instanceof HTMLSelectElement && scenarioButtons.length > 0) {
    for (const btn of scenarioButtons) {
      if (!(btn instanceof HTMLButtonElement)) continue;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetName = scenarioInput.value;
        const el = form.elements.namedItem(targetName);
        if (!(el instanceof HTMLInputElement)) return;
        const current = Math.max(0, toNumber(el.value));
        const scenario = btn.getAttribute("data-scenario");
        let nextValue = current;
        if (scenario === "p90") nextValue = current * 1.25;
        if (scenario === "worst") nextValue = current * 0.75;
        el.value = formatInputValue(nextValue);
        recompute();
      });
    }
  }
}

for (const root of Array.from(document.querySelectorAll("[data-tool]"))) {
  setupToolPage(root);
}
