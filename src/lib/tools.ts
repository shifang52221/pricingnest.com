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
      "This is an estimate; include payment fees, support escalation, or vendor costs in your inputs if they apply."
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
      "If you pay per-request or have specialized acceleration costs, add them into fixed overhead or model separately."
    ],
    faq: [
      {
        q: "What are vCPU-hours and GB-hours?",
        a: "They are time-weighted usage of CPU and memory. For example, 2 vCPUs running for 1 hour is 2 vCPU-hours."
      },
      {
        q: "Should I include reserved instances or savings plans?",
        a: "Yes. Use your effective blended cost per hour after commitments if that reflects your expected baseline."
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
    howItWorks: ["We sum your monthly cost buckets and show variable vs fixed breakdown."],
    assumptions: ["This tool does not fetch pricing. Use outputs from compute/storage/bandwidth tools or your own bills."],
    faq: [
      {
        q: "Why not pull pricing from cloud providers?",
        a: "Live pricing feeds add maintenance overhead and reduce trust. This toolkit is designed to stay input-driven."
      },
      {
        q: "What should go into other costs?",
        a: "Managed DB premiums, queueing, observability, third-party APIs, email/SMS, and any per-usage vendor spend."
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
    assumptions: ["All inputs are for the same period (usually monthly)."],
    faq: [{ q: "What is MRR?", a: "Monthly Recurring Revenue (MRR) is normalized monthly revenue from subscriptions." }]
  },
  {
    slug: "arr-calculator",
    title: "ARR Calculator",
    description: "Convert MRR to ARR (Annual Recurring Revenue).",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "mrr", label: "MRR", type: "number", defaultValue: "50000", min: "0", step: "0.01" }
    ],
    outputs: [{ name: "arr", label: "ARR (MRR x 12)", format: "currency" }],
    related: ["mrr-calculator", "ltv-calculator", "cac-payback-period-calculator"],
    presets: [{ label: "50k MRR", values: { mrr: "50000" } }, { label: "200k MRR", values: { mrr: "200000" } }],
    howItWorks: ["ARR is the annualized run rate: ARR = MRR x 12."],
    assumptions: ["ARR is a run-rate metric, not recognized revenue."],
    faq: [{ q: "Is ARR the same as annual revenue?", a: "Not necessarily. ARR is an annualized run rate from recurring subscriptions, not booked or recognized revenue." }]
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
    howItWorks: ["Monthly churned revenue = MRR x churn %.", "Annual churned revenue = monthly churned revenue x 12 (simple)."],
    assumptions: ["This is a simple estimate and does not model growth or compounding churn."],
    faq: [{ q: "Is this logo churn or revenue churn?", a: "This calculator uses revenue churn. Logo churn can be very different depending on customer mix." }]
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
    howItWorks: ["Implied lifetime (months) = 1 / churn rate.", "LTV = ARPA x gross margin x lifetime."],
    assumptions: ["This uses a simple churn-based lifetime approximation and assumes constant churn."],
    faq: [{ q: "What is ARPA?", a: "Average Revenue Per Account (ARPA) is your average subscription revenue per customer per month." }]
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
    howItWorks: ["Gross profit per month = ARPA x gross margin.", "Payback months = CAC / gross profit per month."],
    assumptions: ["This ignores retention dynamics; combine with LTV to sanity-check if payback is viable."],
    faq: [{ q: "What is a good payback period?", a: "It depends on your market and cash constraints. Many SaaS businesses target 6-12 months, but there is no universal rule." }]
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
    assumptions: ["This uses a simple churn-based lifetime approximation for LTV."],
    faq: [{ q: "Why show LTV:CAC?", a: "It is a common SaaS sanity-check metric. This tool estimates it using break-even CAC and simple LTV." }]
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
    assumptions: ["Churn from a price increase is highly product- and segment-dependent. Treat this as a sensitivity check."],
    faq: [{ q: "What is break-even churn?", a: "It is the churn rate at which the higher price produces the same revenue as before. If actual churn is lower, the increase raises revenue." }]
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
    assumptions: ["This does not model churn reduction or cash-flow benefits of prepay. Use it as a simple pricing conversion."],
    faq: [{ q: "What annual discount is common?", a: "Many SaaS businesses offer 10-20% off for annual prepay, but it depends on segment and cash needs." }]
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
    assumptions: ["This compares monthly costs only; it does not model minimums, tiered overages, or annual discounts."],
    faq: [
      { q: "When is seat-based pricing better?", a: "Seat-based pricing is usually simpler when usage per user is predictable and value maps closely to active users." },
      { q: "When is usage-based pricing better?", a: "Usage-based pricing often fits APIs and infra-heavy products where costs and value scale with consumption." }
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
    assumptions: ["If you have additional cost drivers (egress, storage), model them separately and add them into fixed overhead or combine outputs externally."],
    faq: [
      { q: "What should I enter for infra cost per 1,000 calls?", a: "Use your blended marginal cost per 1,000 calls (compute, queueing, DB, vendor APIs, observability)." }
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
    assumptions: ["Enter your blended egress cost per GB. If your provider uses tiers, use an average cost for your expected mix."],
    faq: [{ q: "Is this a CDN pricing calculator?", a: "It's a cost and price estimator. Enter your own per-GB costs and assumptions." }]
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
      "Request costs depend on your provider; enter your blended cost per 10k requests."
    ],
    faq: [
      { q: "What counts as a request?", a: "Any operation you want to price against (GET/PUT/LIST, reads/writes). Use your provider's definition." },
      { q: "Can I include egress?", a: "Yes - use the bandwidth tool and combine the two estimates for a full storage product model." }
    ]
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
