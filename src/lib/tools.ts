export type ToolInput = {
  name: string;
  label: string;
  type: "number" | "select";
  defaultValue: string;
  min?: string;
  step?: string;
  options?: { value: string; label: string }[];
  help?: string;
};

export type ToolOutput = {
  name: string;
  label: string;
  format: "currency" | "number" | "percent" | "text";
};

export type ToolPreset = {
  label: string;
  values: Record<string, string>;
};

export type ToolFaq = {
  q: string;
  a: string;
};

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  inputs: ToolInput[];
  outputs: ToolOutput[];
  related: string[];
  presets?: ToolPreset[];
  howItWorks?: string[];
  assumptions?: string[];
  inputGuidance?: string[];
  validationChecks?: string[];
  faq?: ToolFaq[];
};

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD (USD)" },
  { value: "GBP", label: "GBP (Pound)" },
  { value: "CAD", label: "CAD (CAD)" },
  { value: "AUD", label: "AUD (AUD)" },
  { value: "EUR", label: "EUR (Euro)" }
] as const;

export const TOOLS: ToolDefinition[] = [
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator",
    description:
      "Estimate a per-unit price from unit costs, fixed overhead, and a target gross margin. Generates revenue and gross profit estimates.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        defaultValue: "USD",
        options: [...CURRENCY_OPTIONS]
      },
      {
        name: "monthlyUnits",
        label: "Monthly units",
        type: "number",
        defaultValue: "100000",
        min: "0",
        step: "1",
        help: "Examples: API calls, minutes, events, GB, messages."
      },
      {
        name: "unitCost",
        label: "Cost per unit",
        type: "number",
        defaultValue: "0.0002",
        min: "0",
        step: "0.0001"
      },
      {
        name: "monthlyFixedCost",
        label: "Monthly fixed cost",
        type: "number",
        defaultValue: "500",
        min: "0",
        step: "1",
        help: "Support, tooling, baseline infra - anything not per-unit."
      },
      {
        name: "targetGrossMarginPct",
        label: "Target gross margin (%)",
        type: "number",
        defaultValue: "80",
        min: "0",
        step: "0.1"
      }
    ],
    outputs: [
      { name: "requiredUnitPrice", label: "Required price per unit", format: "currency" },
      { name: "monthlyRevenue", label: "Estimated monthly revenue", format: "currency" },
      { name: "monthlyGrossProfit", label: "Estimated monthly gross profit", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["api-pricing-calculator", "bandwidth-cost-calculator", "compute-cost-estimator"],
    presets: [
      {
        label: "Events (100k/mo)",
        values: {
          monthlyUnits: "100000",
          unitCost: "0.0002",
          monthlyFixedCost: "500",
          targetGrossMarginPct: "80"
        }
      },
      {
        label: "High volume (5M/mo)",
        values: {
          monthlyUnits: "5000000",
          unitCost: "0.00005",
          monthlyFixedCost: "2000",
          targetGrossMarginPct: "85"
        }
      },
      {
        label: "Low volume (20k/mo)",
        values: {
          monthlyUnits: "20000",
          unitCost: "0.0004",
          monthlyFixedCost: "500",
          targetGrossMarginPct: "80"
        }
      }
    ],
    howItWorks: [
      "We convert fixed monthly cost into a per-unit cost by dividing by monthly units.",
      "We add per-unit variable cost to get all-in cost per unit.",
      "We solve for price using your target gross margin: price = cost / (1 - margin)."
    ],
    assumptions: [
      "Gross margin is based on your inputs (variable cost + fixed cost allocation).",
      "This is an estimate; include payment fees, support escalation, or vendor costs in your inputs if they apply.",
      "Model ranges (best/base/worst) when unit cost or volume is uncertain."
    ],
    inputGuidance: [
      "Start with a typical monthly usage level (p50) before modeling higher-volume scenarios.",
      "Use a blended unit cost that includes infra, vendor APIs, and any per-unit third-party fees.",
      "Put support, on-call, and tooling into fixed cost unless they scale directly with usage.",
      "Align target gross margin with your finance policy so pricing is comparable across tools.",
      "If you have a free tier, reduce paid units to reflect expected free usage."
    ],
    validationChecks: [
      "Required price per unit should be above unit cost; if not, check margin or fixed cost inputs.",
      "Fixed cost per unit = fixed cost / monthly units. Compare it to unit cost for sanity.",
      "Estimated gross margin should be close to your target; large gaps suggest a math or input issue.",
      "Compare implied price per unit against competitor ranges to confirm market realism."
    ],
    faq: [
      {
        q: "What is usage-based pricing?",
        a: "Usage-based pricing charges customers based on consumption (calls, events, GB, minutes) instead of seats or flat tiers."
      },
      {
        q: "What should I use for cost per unit?",
        a: "Use your marginal cost for one unit (compute time, bandwidth, storage requests, vendor fees) in your chosen currency."
      },
      {
        q: "Why does the required unit price change so much?",
        a: "Fixed costs get spread across monthly units. Lower volume means higher fixed cost per unit and a higher required price to hit the same margin."
      }
    ]
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator",
    description:
      "Estimate monthly compute cost from vCPU-hours and GB-hours, then back into a recommended price at your target gross margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "vcpuHours", label: "vCPU-hours per month", type: "number", defaultValue: "10000", min: "0", step: "1" },
      { name: "costPerVcpuHour", label: "Cost per vCPU-hour", type: "number", defaultValue: "0.02", min: "0", step: "0.0001" },
      { name: "memoryGbHours", label: "Memory GB-hours per month", type: "number", defaultValue: "20000", min: "0", step: "1" },
      { name: "costPerGbHour", label: "Cost per GB-hour", type: "number", defaultValue: "0.0025", min: "0", step: "0.0001" },
      {
        name: "monthlyFixedCost",
        label: "Monthly fixed cost",
        type: "number",
        defaultValue: "500",
        min: "0",
        step: "1",
        help: "Monitoring, baseline infra, support, on-call, tooling."
      },
      { name: "targetGrossMarginPct", label: "Target gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "monthlyCost", label: "Estimated monthly cost", format: "currency" },
      { name: "recommendedMonthlyPrice", label: "Recommended monthly price", format: "currency" },
      { name: "effectivePricePerVcpuHour", label: "Effective price per vCPU-hour", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["bandwidth-cost-calculator", "storage-cost-calculator", "monthly-cloud-cost-estimator"],
    presets: [
      {
        label: "Small workload",
        values: {
          vcpuHours: "5000",
          costPerVcpuHour: "0.02",
          memoryGbHours: "10000",
          costPerGbHour: "0.0025",
          monthlyFixedCost: "250",
          targetGrossMarginPct: "80"
        }
      },
      {
        label: "Production API",
        values: {
          vcpuHours: "50000",
          costPerVcpuHour: "0.018",
          memoryGbHours: "120000",
          costPerGbHour: "0.0022",
          monthlyFixedCost: "2500",
          targetGrossMarginPct: "85"
        }
      }
    ],
    howItWorks: [
      "Compute cost = (vCPU-hours x cost per vCPU-hour) + (GB-hours x cost per GB-hour).",
      "We add fixed overhead to estimate total monthly cost.",
      "We compute a recommended price using your target gross margin."
    ],
    assumptions: [
      "Enter blended costs. If you have multiple instance types or regions, use a weighted average.",
      "If you pay per-request or have specialized acceleration costs, add them into fixed overhead or model separately.",
      "This estimate excludes network egress, storage, and third-party vendor costs unless you include them as fixed overhead."
    ],
    inputGuidance: [
      "Use blended, post-discount vCPU and memory rates from recent billing data.",
      "Model steady-state hours rather than burst peaks unless you bill for peak capacity.",
      "Keep bandwidth and storage in their own calculators to avoid double counting.",
      "Include on-call and monitoring in fixed cost if they are required for uptime.",
      "Compare a small and large workload scenario using presets."
    ],
    validationChecks: [
      "Monthly cost should equal vCPU cost + memory cost + fixed overhead.",
      "Effective price per vCPU-hour should exceed your cost per vCPU-hour at the target margin.",
      "Gross margin should be near the target; otherwise review fixed cost or unit rates."
    ],
    faq: [
      {
        q: "What are vCPU-hours and GB-hours?",
        a: "They are time-weighted usage of CPU and memory. For example, 2 vCPUs running for 1 hour is 2 vCPU-hours."
      },
      {
        q: "Should I include reserved instances or savings plans?",
        a: "Yes. Use your effective blended cost per hour after commitments if that reflects your expected baseline."
      },
      {
        q: "Does this include bandwidth or storage costs?",
        a: "No. This tool focuses on compute (CPU + memory). Add bandwidth/storage separately or include them in fixed overhead if you want an all-in estimate."
      }
    ]
  },
  {
    slug: "monthly-cloud-cost-estimator",
    title: "Monthly Cloud Cost Estimator",
    description:
      "Add up monthly compute, storage, bandwidth, and other costs into a single monthly cloud cost estimate (input-driven).",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "computeCost", label: "Compute cost (monthly)", type: "number", defaultValue: "1500", min: "0", step: "0.01" },
      { name: "storageCost", label: "Storage cost (monthly)", type: "number", defaultValue: "300", min: "0", step: "0.01" },
      { name: "bandwidthCost", label: "Bandwidth/egress cost (monthly)", type: "number", defaultValue: "450", min: "0", step: "0.01" },
      { name: "otherCost", label: "Other variable costs (monthly)", type: "number", defaultValue: "250", min: "0", step: "0.01" },
      {
        name: "monthlyFixedCost",
        label: "Monthly fixed overhead",
        type: "number",
        defaultValue: "500",
        min: "0",
        step: "0.01",
        help: "Support, tooling, security, monitoring, baseline services."
      }
    ],
    outputs: [
      { name: "monthlyCloudCost", label: "Estimated monthly cloud cost", format: "currency" },
      { name: "variableCost", label: "Variable cost subtotal", format: "currency" },
      { name: "fixedCost", label: "Fixed overhead", format: "currency" }
    ],
    related: ["compute-cost-estimator", "bandwidth-cost-calculator", "storage-cost-calculator"],
    presets: [
      { label: "Lean SaaS", values: { computeCost: "900", storageCost: "120", bandwidthCost: "180", otherCost: "120", monthlyFixedCost: "400" } },
      { label: "Growing SaaS", values: { computeCost: "2500", storageCost: "450", bandwidthCost: "900", otherCost: "350", monthlyFixedCost: "1200" } }
    ],
    howItWorks: [
      "We sum your monthly cost buckets to estimate total monthly cloud cost.",
      "We show variable vs fixed cost so you can see which levers matter most.",
      "Use the result as a baseline input into pricing or margin models."
    ],
    assumptions: [
      "This tool does not fetch pricing. Use outputs from compute/storage/bandwidth tools or your own bills.",
      "If your costs are seasonal or spiky, use an average month or model multiple scenarios with presets.",
      "Validate this estimate against your billing exports before using it to set pricing."
    ],
    inputGuidance: [
      "Use 2-3 months of billing exports to compute a stable monthly average.",
      "Separate variable costs (compute, storage, bandwidth, vendor usage) from fixed overhead.",
      "Avoid double counting reserved capacity and one-time credits.",
      "If usage is seasonal, model a low and high month with presets.",
      "Add third-party usage in other costs to keep totals accurate."
    ],
    validationChecks: [
      "Variable cost should equal compute + storage + bandwidth + other costs.",
      "Total cloud cost should be greater than or equal to variable cost alone.",
      "Fixed overhead should not fluctuate wildly month to month; if it does, reclassify costs."
    ],
    faq: [
      {
        q: "Why not pull pricing from cloud providers?",
        a: "Live pricing feeds add maintenance overhead and reduce trust. This toolkit is designed to stay input-driven."
      },
      {
        q: "What should go into other costs?",
        a: "Managed DB premiums, queueing, observability, third-party APIs, email/SMS, and any per-usage vendor spend."
      },
      {
        q: "What's the difference between variable and fixed cost here?",
        a: "Variable cost scales with usage (compute, bandwidth, per-request). Fixed cost is baseline overhead (support, tooling, reserved capacity, minimums)."
      }
    ]
  },
  {
    slug: "mrr-calculator",
    title: "MRR Calculator",
    description: "Calculate ending MRR from new, expansion, contraction, and churned MRR.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "startingMrr", label: "Starting MRR", type: "number", defaultValue: "50000", min: "0", step: "0.01" },
      { name: "newMrr", label: "New MRR", type: "number", defaultValue: "8000", min: "0", step: "0.01" },
      { name: "expansionMrr", label: "Expansion MRR", type: "number", defaultValue: "4500", min: "0", step: "0.01" },
      { name: "contractionMrr", label: "Contraction MRR", type: "number", defaultValue: "1200", min: "0", step: "0.01" },
      { name: "churnedMrr", label: "Churned MRR", type: "number", defaultValue: "2500", min: "0", step: "0.01" }
    ],
    outputs: [
      { name: "endingMrr", label: "Ending MRR", format: "currency" },
      { name: "netNewMrr", label: "Net new MRR", format: "currency" },
      { name: "mrrGrowthPct", label: "MRR growth", format: "percent" }
    ],
    related: ["arr-calculator", "ltv-calculator", "churn-impact-calculator"],
    presets: [
      { label: "Early stage", values: { startingMrr: "10000", newMrr: "2500", expansionMrr: "300", contractionMrr: "150", churnedMrr: "250" } },
      { label: "Growth", values: { startingMrr: "80000", newMrr: "12000", expansionMrr: "9000", contractionMrr: "2000", churnedMrr: "4500" } }
    ],
    howItWorks: [
      "Ending MRR = starting + new + expansion - contraction - churned.",
      "Net new MRR = ending - starting.",
      "Growth % = net new MRR / starting MRR."
    ],
    assumptions: [
      "All inputs are for the same period (usually monthly).",
      "Use consistent definitions for churn and contraction across your reporting.",
      "If you report gross vs net MRR differently, keep that definition consistent across time."
    ],
    faq: [
      { q: "What is MRR?", a: "Monthly Recurring Revenue (MRR) is normalized monthly revenue from subscriptions." },
      { q: "What's the difference between contraction and churned MRR?", a: "Contraction is downgraded revenue from retained customers. Churned MRR is revenue lost from customers that fully cancel." },
      { q: "Does MRR include annual contracts?", a: "Typically you normalize annual contracts to a monthly equivalent (annual contract value / 12) so MRR is comparable across billing terms." }
    ]
  },
  {
    slug: "arr-calculator",
    title: "ARR Calculator",
    description: "Convert MRR to ARR (Annual Recurring Revenue) and use it as a run-rate metric for SaaS growth reporting.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "mrr", label: "MRR", type: "number", defaultValue: "50000", min: "0", step: "0.01" }
    ],
    outputs: [{ name: "arr", label: "ARR (MRR x 12)", format: "currency" }],
    related: ["mrr-calculator", "ltv-calculator", "cac-payback-period-calculator"],
    presets: [{ label: "50k MRR", values: { mrr: "50000" } }, { label: "200k MRR", values: { mrr: "200000" } }],
    howItWorks: [
      "ARR is the annualized run rate: ARR = MRR x 12.",
      "If you start from annual contract value, convert to MRR first (ACV / 12), then multiply by 12.",
      "Use ARR for run-rate comparisons, not accounting statements."
    ],
    assumptions: [
      "ARR is a run-rate metric, not recognized revenue.",
      "This assumes your MRR is already normalized (e.g., includes annual contracts prorated monthly).",
      "One-time fees and usage spikes are typically excluded from ARR; track them separately."
    ],
    faq: [
      { q: "Is ARR the same as annual revenue?", a: "Not necessarily. ARR is an annualized run rate from recurring subscriptions, not booked or recognized revenue." },
      { q: "How should I treat one-time fees?", a: "One-time fees are usually excluded from ARR. If they recur predictably, consider reporting them separately." },
      { q: "Why does ARR matter?", a: "ARR is a standard SaaS growth metric for tracking run-rate and comparing performance across periods and cohorts." }
    ]
  },
  {
    slug: "churn-impact-calculator",
    title: "Churn Impact Calculator",
    description: "Estimate churned revenue over a month and a year from your MRR and monthly churn rate.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "mrr", label: "Current MRR", type: "number", defaultValue: "50000", min: "0", step: "0.01" },
      { name: "monthlyChurnPct", label: "Monthly revenue churn (%)", type: "number", defaultValue: "2.5", min: "0", step: "0.01" }
    ],
    outputs: [
      { name: "monthlyChurnedRevenue", label: "Estimated monthly churned revenue", format: "currency" },
      { name: "annualChurnedRevenue", label: "Estimated annual churned revenue (simple)", format: "currency" }
    ],
    related: ["mrr-calculator", "ltv-calculator", "pricing-increase-impact-calculator"],
    presets: [{ label: "2% churn", values: { mrr: "50000", monthlyChurnPct: "2" } }, { label: "5% churn", values: { mrr: "50000", monthlyChurnPct: "5" } }],
    howItWorks: [
      "Monthly churned revenue = MRR x churn %.",
      "Annual churned revenue = monthly churned revenue x 12 (simple).",
      "For a compounding view, retained revenue 鈮?MRR x (1 - churn%)^12."
    ],
    assumptions: [
      "This is a simple estimate and does not model new sales, expansions, or seasonality.",
      "If churn varies by cohort or plan, segment your inputs for accuracy.",
      "Revenue churn can differ from logo churn; use revenue churn when available."
    ],
    faq: [
      { q: "Is this logo churn or revenue churn?", a: "This calculator uses revenue churn. Logo churn can be very different depending on customer mix." },
      { q: "Is annual churn just monthly churn x 12?", a: "This tool shows a simple annualized estimate. For higher churn rates, compounding effects can make the true annual impact larger." },
      { q: "What churn rate should I enter?", a: "Use a recent cohort-based revenue churn rate (gross or net). If you only have logo churn, treat this as a directional estimate." }
    ]
  },
  {
    slug: "ltv-calculator",
    title: "LTV Calculator (SaaS)",
    description: "Estimate customer LTV from ARPA, gross margin, and monthly churn rate.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "arpa", label: "ARPA (monthly)", type: "number", defaultValue: "200", min: "0", step: "0.01" },
      { name: "grossMarginPct", label: "Gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" },
      { name: "monthlyChurnPct", label: "Monthly churn (%)", type: "number", defaultValue: "3", min: "0", step: "0.01" }
    ],
    outputs: [
      { name: "ltv", label: "Estimated LTV", format: "currency" },
      { name: "avgLifetimeMonths", label: "Implied average lifetime (months)", format: "number" }
    ],
    related: ["cac-payback-period-calculator", "break-even-cac-calculator", "churn-impact-calculator"],
    presets: [
      { label: "SMB SaaS", values: { arpa: "100", grossMarginPct: "80", monthlyChurnPct: "4" } },
      { label: "Mid-market", values: { arpa: "450", grossMarginPct: "82", monthlyChurnPct: "2" } }
    ],
    howItWorks: [
      "Implied lifetime (months) 鈮?1 / churn rate (for a simple constant churn model).",
      "Gross profit per month = ARPA x gross margin.",
      "LTV = gross profit per month x implied lifetime."
    ],
    assumptions: [
      "This uses a simple churn-based lifetime approximation and assumes constant churn.",
      "If churn is very low (near 0), LTV can be unrealistically large; use a capped lifetime or cohort data.",
      "This does not model expansion revenue unless you explicitly use net churn and an expansion-aware ARPA."
    ],
    faq: [
      { q: "What is ARPA?", a: "Average Revenue Per Account (ARPA) is your average subscription revenue per customer per month." },
      { q: "Why is lifetime 鈮?1 / churn?", a: "For a simple constant churn model, the expected lifetime in months is approximately the inverse of the monthly churn rate." },
      { q: "Should I use gross or net churn?", a: "For LTV, many teams start with gross revenue churn to avoid over-crediting expansion. Use net churn if your model explicitly includes expansion dynamics." }
    ]
  },
  {
    slug: "cac-payback-period-calculator",
    title: "CAC Payback Period Calculator",
    description: "Estimate how many months it takes to recover CAC using ARPA and gross margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "cac", label: "CAC", type: "number", defaultValue: "1200", min: "0", step: "0.01" },
      { name: "arpa", label: "ARPA (monthly)", type: "number", defaultValue: "200", min: "0", step: "0.01" },
      { name: "grossMarginPct", label: "Gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "paybackMonths", label: "Payback period (months)", format: "number" },
      { name: "grossProfitPerMonth", label: "Gross profit per month", format: "currency" }
    ],
    related: ["ltv-calculator", "break-even-cac-calculator", "arr-calculator"],
    presets: [
      { label: "8-month payback", values: { cac: "1200", arpa: "200", grossMarginPct: "75" } },
      { label: "6-month payback", values: { cac: "1800", arpa: "300", grossMarginPct: "80" } }
    ],
    howItWorks: [
      "Gross profit per month = ARPA x gross margin.",
      "Payback months = CAC / gross profit per month.",
      "Use contribution margin instead of gross margin if fulfillment costs are significant."
    ],
    assumptions: [
      "This ignores retention dynamics; combine with LTV to sanity-check if payback is viable.",
      "This assumes revenue and margin are stable over the payback window.",
      "If gross profit per month is near zero, payback is effectively unbounded."
    ],
    faq: [
      { q: "What is a good payback period?", a: "It depends on your market and cash constraints. Many SaaS businesses target 6-12 months, but there is no universal rule." },
      { q: "What should be included in CAC?", a: "Include sales and marketing spend allocated per new customer (ads, SDR/AE costs, commissions, tools). Keep your definition consistent across periods." },
      { q: "Should I use gross margin or contribution margin?", a: "Gross margin is a common starting point. If fulfillment costs are significant (support, onboarding, infra), contribution margin can be a better payback signal." }
    ]
  },
  {
    slug: "break-even-cac-calculator",
    title: "Break-Even CAC Calculator",
    description: "Estimate the maximum CAC you can afford given ARPA, gross margin, churn, and a target payback period.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "arpa", label: "ARPA (monthly)", type: "number", defaultValue: "200", min: "0", step: "0.01" },
      { name: "grossMarginPct", label: "Gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" },
      { name: "monthlyChurnPct", label: "Monthly churn (%)", type: "number", defaultValue: "3", min: "0", step: "0.01" },
      { name: "targetPaybackMonths", label: "Target payback (months)", type: "number", defaultValue: "9", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "breakEvenCac", label: "Break-even CAC (payback target)", format: "currency" },
      { name: "ltv", label: "Estimated LTV", format: "currency" },
      { name: "ltvToCac", label: "LTV:CAC (using break-even CAC)", format: "number" }
    ],
    related: ["ltv-calculator", "cac-payback-period-calculator", "pricing-increase-impact-calculator"],
    presets: [{ label: "SMB", values: { arpa: "120", grossMarginPct: "80", monthlyChurnPct: "4", targetPaybackMonths: "8" } }],
    howItWorks: [
      "Gross profit per month = ARPA x gross margin.",
      "Break-even CAC (payback) = gross profit per month x target payback months.",
      "We also compute a simple churn-based LTV for context."
    ],
    assumptions: [
      "This uses a simple churn-based lifetime approximation for LTV.",
      "Break-even CAC here is based on payback, not on full LTV.",
      "If you have ramp time (onboarding, usage ramp), effective payback will be longer."
    ],
    faq: [
      { q: "Why show LTV:CAC?", a: "It is a common SaaS sanity-check metric. This tool estimates it using break-even CAC and simple LTV." },
      { q: "What does break-even CAC mean here?", a: "It's the CAC you can afford to recover within your target payback window based on gross profit per month." },
      { q: "How should I pick target payback months?", a: "Shorter payback is safer for cash flow. Many teams choose 6-12 months depending on sales cycle length, expansion, and capital constraints." }
    ]
  },
  {
    slug: "pricing-increase-impact-calculator",
    title: "Pricing Increase Impact Calculator",
    description:
      "Estimate the impact of a price increase on monthly revenue, including an assumption for customer churn from the increase.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "currentPrice", label: "Current price (monthly)", type: "number", defaultValue: "49", min: "0", step: "0.01" },
      { name: "customers", label: "Customers", type: "number", defaultValue: "1500", min: "0", step: "1" },
      { name: "priceIncreasePct", label: "Price increase (%)", type: "number", defaultValue: "10", min: "0", step: "0.1" },
      { name: "expectedChurnPct", label: "Expected churn from increase (%)", type: "number", defaultValue: "2", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "revenueBefore", label: "Revenue before", format: "currency" },
      { name: "revenueAfter", label: "Revenue after", format: "currency" },
      { name: "deltaRevenue", label: "Change in revenue", format: "currency" },
      { name: "breakEvenChurnPct", label: "Break-even churn (%)", format: "percent" }
    ],
    related: ["mrr-calculator", "churn-impact-calculator", "annual-discount-calculator"],
    presets: [
      { label: "Small increase", values: { currentPrice: "29", customers: "3000", priceIncreasePct: "5", expectedChurnPct: "1" } },
      { label: "10% increase", values: { currentPrice: "49", customers: "1500", priceIncreasePct: "10", expectedChurnPct: "2" } }
    ],
    howItWorks: [
      "Revenue before = customers x current price.",
      "Revenue after = (customers x (1 - churn)) x (current price x (1 + increase)).",
      "Break-even churn is the churn rate where revenue after equals revenue before."
    ],
    assumptions: [
      "Churn from a price increase is highly product- and segment-dependent. Treat this as a sensitivity check.",
      "This is a single price-point model; packaging changes require segment-level migration modeling.",
      "If you grandfather existing customers, model churn separately for new vs existing cohorts."
    ],
    faq: [
      { q: "What is break-even churn?", a: "It is the churn rate at which the higher price produces the same revenue as before. If actual churn is lower, the increase raises revenue." },
      { q: "How can I estimate churn from a price increase?", a: "Use a range (best/base/worst). Segment by customer size, contract term, and price sensitivity. You can also run limited experiments or grandfather existing customers." },
      { q: "Does this model packaging changes?", a: "No. It's a simple sensitivity calculator for a single price point. For packaging changes, model migration by segment and expected conversion." }
    ]
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator",
    description:
      "Convert a monthly price to an annual prepay price with a discount and compute the effective monthly rate and savings.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "monthlyPrice", label: "Monthly price", type: "number", defaultValue: "49", min: "0", step: "0.01" },
      { name: "annualDiscountPct", label: "Annual discount (%)", type: "number", defaultValue: "15", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "annualPrice", label: "Annual price (prepay)", format: "currency" },
      { name: "effectiveMonthly", label: "Effective monthly rate", format: "currency" },
      { name: "annualSavings", label: "Savings vs monthly", format: "currency" }
    ],
    related: ["pricing-increase-impact-calculator", "mrr-calculator", "cac-payback-period-calculator"],
    presets: [
      { label: "10% off", values: { monthlyPrice: "49", annualDiscountPct: "10" } },
      { label: "15% off", values: { monthlyPrice: "49", annualDiscountPct: "15" } }
    ],
    howItWorks: [
      "Annual price = monthly price x 12 x (1 - discount).",
      "Effective monthly rate = annual price / 12.",
      "Savings = (monthly price x 12) - annual price."
    ],
    assumptions: [
      "This does not model churn reduction or cash-flow benefits of prepay. Use it as a simple pricing conversion.",
      "This excludes taxes and payment processing fees; add them if they materially affect net revenue.",
      "If annual buyers churn less, incorporate that separately when forecasting."
    ],
    faq: [
      { q: "What annual discount is common?", a: "Many SaaS businesses offer 10-20% off for annual prepay, but it depends on segment and cash needs." },
      { q: "Why offer an annual discount at all?", a: "Annual prepay can improve cash flow and reduce churn risk. The discount trades some revenue for commitment and lower collection overhead." },
      { q: "How should I think about effective monthly rate?", a: "Effective monthly rate is just the annual prepay spread over 12 months. It helps compare monthly vs annual plans on the same basis." }
    ]
  },
  {
    slug: "seat-vs-usage-pricing-comparison",
    title: "Seat vs Usage Pricing Comparison",
    description: "Compare a seat-based plan against usage-based pricing for the same workload, including a clear cost difference.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "seats", label: "Seats", type: "number", defaultValue: "10", min: "0", step: "1" },
      { name: "seatPrice", label: "Price per seat (monthly)", type: "number", defaultValue: "49", min: "0", step: "0.01" },
      { name: "monthlyUnits", label: "Monthly units", type: "number", defaultValue: "250000", min: "0", step: "1" },
      { name: "unitPrice", label: "Price per unit", type: "number", defaultValue: "0.0003", min: "0", step: "0.0001" }
    ],
    outputs: [
      { name: "seatModelCost", label: "Seat model total", format: "currency" },
      { name: "usageModelCost", label: "Usage model total", format: "currency" },
      { name: "difference", label: "Difference (seat - usage)", format: "currency" },
      { name: "cheaperModel", label: "Cheaper model", format: "text" }
    ],
    related: ["usage-based-pricing-calculator", "api-pricing-calculator", "pricing-increase-impact-calculator"],
    presets: [
      { label: "Small team", values: { seats: "5", seatPrice: "49", monthlyUnits: "200000", unitPrice: "0.0003" } },
      { label: "Growth team", values: { seats: "25", seatPrice: "59", monthlyUnits: "2000000", unitPrice: "0.0002" } }
    ],
    howItWorks: [
      "Seat model cost = seats x price per seat.",
      "Usage model cost = monthly units x price per unit.",
      "We compute the difference and highlight which model is cheaper."
    ],
    assumptions: [
      "This compares monthly costs only; it does not model minimums, tiered overages, or annual discounts.",
      "Seat utilization and usage can vary widely; use realistic per-seat usage assumptions.",
      "If usage is bursty, consider minimums or overage tiers to avoid margin surprises."
    ],
    inputGuidance: [
      "Use actual active seats, not licensed seats, to avoid overstating seat revenue.",
      "Estimate usage per seat so usage pricing reflects the same workload.",
      "Model a conservative unit price to test downside risk for high-usage accounts.",
      "If you already publish tiered pricing, use the effective unit price for the target tier.",
      "Run a low-usage and high-usage scenario to see where each model breaks."
    ],
    validationChecks: [
      "Seat model total should equal seats x price per seat.",
      "Usage model total should equal monthly units x price per unit.",
      "The cheaper model should flip when you increase seats or decrease usage.",
      "If both models are identical, check that your inputs are not zeroed."
    ],
    faq: [
      { q: "When is seat-based pricing better?", a: "Seat-based pricing is usually simpler when usage per user is predictable and value maps closely to active users." },
      { q: "When is usage-based pricing better?", a: "Usage-based pricing often fits APIs and infra-heavy products where costs and value scale with consumption." },
      { q: "How do minimums or tiers change the result?", a: "If you have minimums, tiered pricing, or volume discounts, use this tool as a baseline and then adjust using scenario presets for your tier thresholds." }
    ]
  },
  {
    slug: "api-pricing-calculator",
    title: "API Pricing Calculator",
    description: "Estimate a monthly API plan price from calls, infra cost per 1k calls, fixed overhead, and a target gross margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "callsPerMonth", label: "API calls per month", type: "number", defaultValue: "5000000", min: "0", step: "1" },
      { name: "infraCostPer1kCalls", label: "Infra cost per 1,000 calls", type: "number", defaultValue: "0.02", min: "0", step: "0.0001" },
      { name: "monthlyFixedCost", label: "Monthly fixed cost", type: "number", defaultValue: "1000", min: "0", step: "1" },
      { name: "targetGrossMarginPct", label: "Target gross margin (%)", type: "number", defaultValue: "85", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "monthlyCost", label: "Estimated monthly cost", format: "currency" },
      { name: "recommendedMonthlyPrice", label: "Recommended monthly price", format: "currency" },
      { name: "pricePer1kCalls", label: "Implied price per 1,000 calls", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["usage-based-pricing-calculator", "compute-cost-estimator", "monthly-cloud-cost-estimator"],
    presets: [
      { label: "1M calls/mo", values: { callsPerMonth: "1000000", infraCostPer1kCalls: "0.02", monthlyFixedCost: "500", targetGrossMarginPct: "85" } },
      { label: "10M calls/mo", values: { callsPerMonth: "10000000", infraCostPer1kCalls: "0.015", monthlyFixedCost: "1500", targetGrossMarginPct: "85" } }
    ],
    howItWorks: [
      "Variable infra cost = (calls / 1,000) x cost per 1,000 calls.",
      "Monthly cost = variable infra cost + fixed overhead.",
      "Recommended price = monthly cost / (1 - target margin)."
    ],
    assumptions: [
      "If you have additional cost drivers (egress, storage), model them separately and add them into fixed overhead or combine outputs externally.",
      "APIs often have bursty usage; model a few scenarios (p50 vs p90) using presets.",
      "If you have free tiers or included usage, model the expected paid calls per customer after free usage."
    ],
    inputGuidance: [
      "Use a blended infra cost per 1,000 calls based on recent bills and expected volume.",
      "Set calls per month to the plan you are pricing, not total company usage.",
      "If you have free tiers, reduce paid calls to reflect actual billable usage.",
      "Include vendor or model costs in fixed overhead if they are not per-call.",
      "Use the target gross margin your finance team expects for API products."
    ],
    validationChecks: [
      "Implied price per 1,000 calls should be above infra cost per 1,000 calls.",
      "Recommended monthly price should always exceed monthly cost.",
      "Gross margin should match your target within rounding."
    ],
    faq: [
      { q: "What should I enter for infra cost per 1,000 calls?", a: "Use your blended marginal cost per 1,000 calls (compute, queueing, DB, vendor APIs, observability)." },
      { q: "How do I handle free tiers or included calls?", a: "Model included calls as part of your plan design. You can estimate cost at expected usage (including free tier) and then set pricing tiers around meaningful breakpoints." },
      { q: "What gross margin should an API target?", a: "It depends on your category and scale. Start with a range (70-90%) and sanity-check competitiveness and cost recovery under different workloads." }
    ]
  },
  {
    slug: "api-cost-estimator",
    title: "API Cost Estimator",
    description:
      "Estimate monthly API costs and cost per call from request volume, infra cost per 1k calls, vendor cost per 1k, and fixed overhead.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "callsPerMonth", label: "API calls per month", type: "number", defaultValue: "5000000", min: "0", step: "1" },
      { name: "infraCostPer1kCalls", label: "Infra cost per 1,000 calls", type: "number", defaultValue: "0.02", min: "0", step: "0.0001" },
      {
        name: "vendorCostPer1kCalls",
        label: "Vendor/API cost per 1,000 calls",
        type: "number",
        defaultValue: "0.01",
        min: "0",
        step: "0.0001",
        help: "Optional: LLMs, third-party APIs, enrichment, email/SMS, etc."
      },
      {
        name: "monthlyFixedCost",
        label: "Monthly fixed overhead",
        type: "number",
        defaultValue: "500",
        min: "0",
        step: "1",
        help: "Support, tooling, baseline infra, on-call - anything not per-call."
      }
    ],
    outputs: [
      { name: "monthlyTotalCost", label: "Estimated monthly total cost", format: "currency" },
      { name: "costPerCall", label: "Cost per call", format: "currency" },
      { name: "costPer1kCalls", label: "Cost per 1,000 calls", format: "currency" },
      { name: "monthlyVariableCost", label: "Estimated monthly variable cost", format: "currency" }
    ],
    related: ["api-pricing-calculator", "usage-based-pricing-calculator", "compute-cost-estimator"],
    presets: [
      { label: "1M calls/mo", values: { callsPerMonth: "1000000", infraCostPer1kCalls: "0.02", vendorCostPer1kCalls: "0.00", monthlyFixedCost: "300" } },
      { label: "10M calls/mo", values: { callsPerMonth: "10000000", infraCostPer1kCalls: "0.015", vendorCostPer1kCalls: "0.01", monthlyFixedCost: "800" } }
    ],
    howItWorks: [
      "Variable cost = (calls / 1,000) x (infra cost per 1,000 + vendor cost per 1,000).",
      "Total monthly cost = variable cost + fixed overhead.",
      "Cost per call = total monthly cost / calls."
    ],
    assumptions: [
      "Costs are estimates. Use blended unit costs (weighted averages) across regions and instance types.",
      "If your costs are tiered or discounted at volume, enter an average cost per 1,000 calls for your expected mix.",
      "If you have significant bandwidth/storage costs, add them to fixed overhead or model them in separate calculators."
    ],
    inputGuidance: [
      "Combine infra and vendor costs for a realistic per-call baseline.",
      "Use expected plan volume, not total system usage, for pricing scenarios.",
      "Include support and monitoring in fixed overhead when they scale by customer count.",
      "If vendor pricing is tiered, enter a blended average for your typical mix.",
      "Run a low-volume and high-volume scenario to see cost per call variance."
    ],
    validationChecks: [
      "Monthly total cost should equal variable cost plus fixed overhead.",
      "Cost per 1,000 calls should be cost per call x 1,000.",
      "As calls increase, cost per call should trend toward variable unit cost."
    ],
    faq: [
      { q: "Should support costs be included?", a: "If support scales with customer count, treat it as semi-variable and include a portion in fixed overhead for pricing decisions." },
      { q: "Why do I need vendor cost per 1,000 calls?", a: "Many APIs have pass-through costs (LLMs, enrichment, third-party APIs). Including them prevents margin surprises." },
      { q: "How should I model spiky traffic?", a: "Use a few presets (p50 vs p90 monthly calls) and compare the cost per call under each scenario." }
    ]
  },
  {
    slug: "price-per-gb-month-calculator",
    title: "Price per GB-Month Calculator",
    description:
      "Estimate a margin-safe price per GB-month using storage cost per GB-month, fixed overhead, average stored GB, and a target gross margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "avgGbStored", label: "Average GB stored", type: "number", defaultValue: "500", min: "0", step: "0.01" },
      {
        name: "costPerGbMonth",
        label: "Cost per GB-month",
        type: "number",
        defaultValue: "0.02",
        min: "0",
        step: "0.0001",
        help: "Enter your blended storage cost per GB per month."
      },
      { name: "monthlyFixedCost", label: "Monthly fixed cost", type: "number", defaultValue: "200", min: "0", step: "1" },
      { name: "targetGrossMarginPct", label: "Target gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "recommendedPricePerGbMonth", label: "Recommended price per GB-month", format: "currency" },
      { name: "recommendedMonthlyPrice", label: "Recommended monthly price", format: "currency" },
      { name: "monthlyCost", label: "Estimated monthly cost", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["storage-cost-calculator", "bandwidth-cost-calculator", "usage-based-pricing-calculator"],
    presets: [
      { label: "100 GB stored", values: { avgGbStored: "100", costPerGbMonth: "0.02", monthlyFixedCost: "50", targetGrossMarginPct: "80" } },
      { label: "1 TB stored", values: { avgGbStored: "1000", costPerGbMonth: "0.018", monthlyFixedCost: "200", targetGrossMarginPct: "80" } }
    ],
    howItWorks: [
      "Monthly cost = (avg GB stored x cost per GB-month) + fixed overhead.",
      "Recommended monthly price = monthly cost / (1 - target margin).",
      "Recommended price per GB-month = recommended monthly price / avg GB stored."
    ],
    assumptions: [
      "This calculator focuses on GB-month costs. If request pricing is material, use the storage cost calculator and include requests.",
      "Use a blended cost per GB-month if you have multiple storage tiers or regions.",
      "If your product includes backups, replication, or encryption overhead, include it in the GB-month cost."
    ],
    inputGuidance: [
      "Use average GB-month stored, not peak storage snapshots.",
      "Include replication or backup overhead in cost per GB-month.",
      "Put support and monitoring costs in fixed overhead.",
      "If request costs are meaningful, model them separately and add them into fixed cost.",
      "Validate the target margin against your storage product gross margin goals."
    ],
    validationChecks: [
      "Recommended price per GB-month should exceed cost per GB-month at your target margin.",
      "Monthly cost should scale linearly with average GB stored.",
      "If average GB stored doubles, recommended monthly price should roughly double."
    ],
    faq: [
      { q: "Is this the same as cloud storage price?", a: "No. This estimates your selling price based on your costs and target margin." },
      { q: "Should I include request costs?", a: "If your workload has heavy requests, include them via the storage cost calculator or add them to fixed overhead." },
      { q: "What unit should I show on my pricing page?", a: "GB-month is common because it reflects storage over time. Add an example workload so buyers can estimate their bill." }
    ]
  },
  {
    slug: "tiered-usage-pricing-calculator",
    title: "Tiered Usage Pricing Calculator",
    description: "Estimate a monthly bill for a platform fee + included usage + tiered overages (up to 3 tiers), plus effective rates.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "monthlyUnits", label: "Monthly units", type: "number", defaultValue: "1500000", min: "0", step: "1", help: "Calls, events, minutes, messages, GB - any unit." },
      { name: "baseFee", label: "Platform fee (monthly)", type: "number", defaultValue: "99", min: "0", step: "0.01" },
      { name: "includedUnits", label: "Included units", type: "number", defaultValue: "100000", min: "0", step: "1" },
      { name: "tier1Units", label: "Tier 1 overage units", type: "number", defaultValue: "900000", min: "0", step: "1" },
      { name: "tier1PricePerUnit", label: "Tier 1 price per unit", type: "number", defaultValue: "0.0002", min: "0", step: "0.0001" },
      { name: "tier2Units", label: "Tier 2 overage units", type: "number", defaultValue: "4000000", min: "0", step: "1" },
      { name: "tier2PricePerUnit", label: "Tier 2 price per unit", type: "number", defaultValue: "0.00015", min: "0", step: "0.0001" },
      { name: "tier3PricePerUnit", label: "Tier 3 price per unit (beyond tiers)", type: "number", defaultValue: "0.0001", min: "0", step: "0.0001" }
    ],
    outputs: [
      { name: "monthlyBill", label: "Estimated monthly bill", format: "currency" },
      { name: "overageUnits", label: "Overage units", format: "number" },
      { name: "blendedOverageRate", label: "Blended overage rate (per unit)", format: "currency" },
      { name: "effectivePricePerUnit", label: "Effective price per unit", format: "currency" }
    ],
    related: ["usage-based-pricing-calculator", "seat-vs-usage-pricing-comparison", "api-pricing-calculator"],
    presets: [
      {
        label: "Starter tier",
        values: {
          monthlyUnits: "250000",
          baseFee: "49",
          includedUnits: "50000",
          tier1Units: "200000",
          tier1PricePerUnit: "0.0003",
          tier2Units: "0",
          tier2PricePerUnit: "0.0002",
          tier3PricePerUnit: "0.0002"
        }
      },
      {
        label: "Growth tier",
        values: {
          monthlyUnits: "1500000",
          baseFee: "99",
          includedUnits: "100000",
          tier1Units: "900000",
          tier1PricePerUnit: "0.0002",
          tier2Units: "4000000",
          tier2PricePerUnit: "0.00015",
          tier3PricePerUnit: "0.0001"
        }
      }
    ],
    howItWorks: [
      "Overage units = max(0, monthly units - included units).",
      "Tier 1 charges apply to the first Tier 1 overage units; Tier 2 applies next; Tier 3 applies to the remainder.",
      "Monthly bill = platform fee + overage cost. Effective rates are computed from the bill and usage."
    ],
    assumptions: [
      "This models a simple 3-tier overage schedule. If you have more tiers, approximate using the closest 3 breakpoints.",
      "If your billing includes rounding, minimum charges, or caps, treat this as an estimate.",
      "Use a few scenarios (p50 vs p90 monthly units) to make sure heavy customers still pay enough."
    ],
    inputGuidance: [
      "Set included units so a typical small customer stays within the platform fee.",
      "Tier 1 and Tier 2 units should represent the first and second overage ranges.",
      "Use decreasing prices per unit as volume increases to match common tiering.",
      "Keep a platform fee to recover fixed costs before overages kick in.",
      "Validate tiers against your real pricing page to avoid mismatches."
    ],
    validationChecks: [
      "Overage units should be zero when monthly units are below included units.",
      "Monthly bill should never be below the platform fee.",
      "Blended overage rate should be at or below the tier 1 rate when tiers are used.",
      "Effective price per unit should decline as usage grows if tier prices decline."
    ],
    faq: [
      { q: "How should I pick included units?", a: "Included usage should cover a typical small customer and reduce bill shock. Use a platform fee to cover baseline overhead." },
      { q: "Should tiers be based on total usage or overage usage?", a: "Most pricing pages describe total usage tiers. This calculator uses overage units for clarity: included units are free within the platform fee, then tiers apply." },
      { q: "How do I avoid bill shock?", a: "Use a predictable platform fee, publish example bills, and consider usage alerts or caps for unusual spikes." }
    ]
  },
  {
    slug: "bandwidth-cost-calculator",
    title: "Bandwidth Cost Calculator",
    description:
      "Estimate egress/bandwidth cost and a recommended price using your own per-GB costs, fixed overhead, and target gross margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "gbPerMonth", label: "GB egress per month", type: "number", defaultValue: "2000", min: "0", step: "0.01" },
      { name: "costPerGb", label: "Cost per GB", type: "number", defaultValue: "0.03", min: "0", step: "0.0001" },
      { name: "monthlyFixedCost", label: "Monthly fixed cost", type: "number", defaultValue: "300", min: "0", step: "1" },
      { name: "targetGrossMarginPct", label: "Target gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "monthlyCost", label: "Estimated monthly cost", format: "currency" },
      { name: "recommendedMonthlyPrice", label: "Recommended monthly price", format: "currency" },
      { name: "effectivePricePerGb", label: "Effective price per GB", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["storage-cost-calculator", "compute-cost-estimator", "monthly-cloud-cost-estimator"],
    presets: [
      { label: "500 GB/mo", values: { gbPerMonth: "500", costPerGb: "0.03", monthlyFixedCost: "100", targetGrossMarginPct: "80" } },
      { label: "2 TB/mo", values: { gbPerMonth: "2000", costPerGb: "0.03", monthlyFixedCost: "300", targetGrossMarginPct: "80" } }
    ],
    howItWorks: [
      "Bandwidth variable cost = GB per month x cost per GB.",
      "Monthly cost = bandwidth variable cost + fixed overhead.",
      "Recommended price = monthly cost / (1 - target margin)."
    ],
    assumptions: [
      "Enter your blended egress cost per GB. If your provider uses tiers, use an average cost for your expected mix.",
      "Egress costs can differ by region and destination; use a weighted average if you have a global footprint.",
      "This estimate excludes CDN request fees unless you include them in fixed overhead."
    ],
    inputGuidance: [
      "Use a blended egress cost per GB across regions and CDNs.",
      "Model average monthly GB, not peak traffic spikes.",
      "Include CDN request costs in fixed overhead if they are material.",
      "Apply commitment discounts by lowering the blended cost per GB.",
      "Test a high-traffic scenario to confirm margins hold at scale."
    ],
    validationChecks: [
      "Effective price per GB should exceed cost per GB at your target margin.",
      "Recommended price should be greater than or equal to monthly cost.",
      "If fixed cost is zero, confirm you are not missing support overhead."
    ],
    faq: [
      { q: "Is this a CDN pricing calculator?", a: "It's a cost and price estimator. Enter your own per-GB costs and assumptions." },
      { q: "What cost per GB should I use?", a: "Use a blended egress cost per GB after discounts, tiers, and CDN mix. If you have multiple regions, use a weighted average." },
      { q: "Should I include origin fetch and request costs?", a: "If request pricing is meaningful for your workload, include it in fixed overhead or model it separately and add it to the monthly cost." }
    ]
  },
  {
    slug: "storage-cost-calculator",
    title: "Storage Cost Calculator",
    description:
      "Estimate storage cost from average GB stored, request volume, and per-unit costs, then compute a price at your target margin.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "avgGbStored", label: "Average GB stored", type: "number", defaultValue: "5000", min: "0", step: "0.01" },
      { name: "costPerGbMonth", label: "Cost per GB-month", type: "number", defaultValue: "0.015", min: "0", step: "0.0001" },
      { name: "requestsPerMonth", label: "Requests per month", type: "number", defaultValue: "20000000", min: "0", step: "1" },
      { name: "costPer10kRequests", label: "Cost per 10,000 requests", type: "number", defaultValue: "0.004", min: "0", step: "0.0001" },
      { name: "monthlyFixedCost", label: "Monthly fixed cost", type: "number", defaultValue: "500", min: "0", step: "1" },
      { name: "targetGrossMarginPct", label: "Target gross margin (%)", type: "number", defaultValue: "80", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "monthlyCost", label: "Estimated monthly cost", format: "currency" },
      { name: "recommendedMonthlyPrice", label: "Recommended monthly price", format: "currency" },
      { name: "effectivePricePerGb", label: "Effective price per GB-month", format: "currency" },
      { name: "grossMarginPct", label: "Gross margin", format: "percent" }
    ],
    related: ["bandwidth-cost-calculator", "compute-cost-estimator", "monthly-cloud-cost-estimator"],
    presets: [
      { label: "1 TB stored", values: { avgGbStored: "1024", costPerGbMonth: "0.015", requestsPerMonth: "5000000", costPer10kRequests: "0.004", monthlyFixedCost: "200", targetGrossMarginPct: "80" } },
      { label: "5 TB stored", values: { avgGbStored: "5120", costPerGbMonth: "0.012", requestsPerMonth: "20000000", costPer10kRequests: "0.004", monthlyFixedCost: "500", targetGrossMarginPct: "80" } }
    ],
    howItWorks: [
      "Storage cost = average GB stored x cost per GB-month.",
      "Request cost = (requests / 10,000) x cost per 10,000 requests.",
      "We add fixed overhead and compute a recommended price using your target margin."
    ],
    assumptions: [
      "Average GB stored should reflect a typical monthly average, not peak.",
      "Request costs depend on your provider; enter your blended cost per 10k requests.",
      "Include replication, backups, or multi-region overhead in your unit costs if they apply."
    ],
    inputGuidance: [
      "Use average GB-month stored rather than peak snapshots.",
      "Include replication and backup overhead in cost per GB-month.",
      "Model request costs with your blended per-10k request rate.",
      "Keep bandwidth in the bandwidth calculator to avoid double counting.",
      "Use presets for low and high request intensity workloads."
    ],
    validationChecks: [
      "Request cost should equal (requests / 10,000) x cost per 10,000 requests.",
      "Monthly cost should increase when either GB stored or request volume increases.",
      "Effective price per GB-month should exceed unit cost at your target margin."
    ],
    faq: [
      { q: "What counts as a request?", a: "Any operation you want to price against (GET/PUT/LIST, reads/writes). Use your provider's definition." },
      { q: "Can I include egress?", a: "Yes - use the bandwidth tool and combine the two estimates for a full storage product model." },
      { q: "Should I use peak or average stored GB?", a: "Use average GB-month for cost. If customers have spiky storage, consider modeling a higher average or adding a minimum/overage policy." }
    ]
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

