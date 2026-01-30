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

export type ToolScenario = {
  title: string;
  detail: string;
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
  scenarios?: ToolScenario[];
  edgeCases?: string[];
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
    scenarios: [
      {
        title: "Event-driven SaaS",
        detail: "Model 100k events per month at $0.0002 cost and $500 fixed overhead to price an analytics API."
      },
      {
        title: "High-volume platform",
        detail: "Use 5M units per month with lower unit cost to see if price can stay competitive while hitting margin."
      },
      {
        title: "Low-volume premium",
        detail: "Use 20k units and higher cost to validate whether a minimum fee or tier is needed."
      }
    ],
    edgeCases: [
      "If monthly units are 0, pricing will be undefined; use a minimum platform fee instead.",
      "If target margin is 100%, the required price will be infinite. Use a realistic margin ceiling.",
      "If unit cost is 0, price is driven only by fixed cost allocation."
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
      },
      {
        q: "Should I include payment fees or taxes in unit cost?",
        a: "Include any fees that scale with revenue or usage if they materially affect margin. Taxes are usually excluded from pricing models."
      },
      {
        q: "How do I model a minimum fee with usage pricing?",
        a: "Set a base platform fee outside this calculator and then price the usage units based on the required per-unit price."
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
    scenarios: [
      {
        title: "Small workload",
        detail: "5k vCPU-hours and 10k GB-hours with low fixed overhead to price a small team plan."
      },
      {
        title: "Production API",
        detail: "50k vCPU-hours and 120k GB-hours to model a steady enterprise workload."
      },
      {
        title: "Memory-heavy service",
        detail: "Increase GB-hours relative to vCPU-hours to test memory-dominant workloads."
      }
    ],
    edgeCases: [
      "If vCPU-hours and GB-hours are both 0, the estimate should reflect fixed overhead only.",
      "Very low unit costs with high fixed overhead can produce unintuitive prices; recheck cost allocation.",
      "If target margin is near 0, recommended price will be close to cost and may be unviable."
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
      },
      {
        q: "How do I model bursty workloads?",
        a: "Use multiple scenarios with higher vCPU-hours or GB-hours to represent peak usage, then compare the price range."
      },
      {
        q: "Should I treat autoscaling as lower cost?",
        a: "Autoscaling reduces idle hours, so your blended cost per hour may drop. Use a blended rate from actual billing."
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
      "Add third-party usage in other costs to keep totals accurate.",
      "Include support, security, and on-call overhead in fixed cost."
    ],
    validationChecks: [
      "Variable cost should equal compute + storage + bandwidth + other costs.",
      "Total cloud cost should be greater than or equal to variable cost alone.",
      "Fixed overhead should not fluctuate wildly month to month; if it does, reclassify costs.",
      "Monthly cloud cost should equal variable cost plus fixed overhead."
    ],
    scenarios: [
      {
        title: "Lean SaaS baseline",
        detail: "Lower compute and storage with modest overhead to benchmark a small product."
      },
      {
        title: "Growth SaaS baseline",
        detail: "Higher compute, bandwidth, and overhead to model a scaling product."
      },
      {
        title: "Vendor-heavy stack",
        detail: "Increase other costs to reflect third-party APIs, email, or model usage."
      },
      {
        title: "Cost-optimization baseline",
        detail: "Reduce compute and bandwidth to estimate savings from optimization work."
      }
    ],
    edgeCases: [
      "If any cost bucket is negative, reset to 0 to avoid understating total cost.",
      "If fixed overhead is 0, double-check that support and monitoring are not missing.",
      "Large month-to-month swings can indicate seasonality; model multiple months.",
      "If variable cost is 0, verify that usage-driven costs are not missing."
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
      },
      {
        q: "Should I include credits or discounts?",
        a: "Use net costs after committed-use discounts, but exclude temporary credits to avoid understating steady-state costs."
      },
      {
        q: "How often should I refresh this model?",
        a: "Update monthly if your usage is growing fast, otherwise quarterly is usually sufficient."
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
      "If you report gross vs net MRR differently, keep that definition consistent across time.",
      "Inputs should be net of credits and refunds so MRR reflects recurring revenue."
    ],
    inputGuidance: [
      "Keep all inputs in the same period and currency (usually monthly).",
      "Use net new definitions that match your finance reporting.",
      "Exclude one-time fees so MRR reflects recurring revenue.",
      "Segment by plan or cohort if churn and expansion differ materially.",
      "Use the most recent closed month to avoid partial period noise.",
      "Treat reactivations consistently (either as new or expansion) across periods."
    ],
    validationChecks: [
      "Ending MRR should equal starting + new + expansion - contraction - churned.",
      "Net new MRR should equal ending minus starting.",
      "If churned + contraction exceeds new + expansion, growth should be negative.",
      "Ending MRR should not be negative; if it is, review churn or contraction inputs."
    ],
    scenarios: [
      {
        title: "Early stage SaaS",
        detail: "Low starting MRR with small new and expansion to validate baseline growth."
      },
      {
        title: "Growth SaaS",
        detail: "Higher expansion MRR to see how upsell drives net new MRR."
      },
      {
        title: "Churn pressure",
        detail: "Increase churned MRR to quantify how much new MRR is needed to offset losses."
      }
    ],
    edgeCases: [
      "If starting MRR is 0, growth percent is not meaningful; focus on net new MRR.",
      "If all components are 0, ending MRR will be 0; confirm you have real inputs.",
      "Negative net new MRR indicates contraction + churn exceeds new + expansion.",
      "If starting MRR is very small, growth percent will be noisy; use net new MRR for trend."
    ],
    faq: [
      { q: "What is MRR?", a: "Monthly Recurring Revenue (MRR) is normalized monthly revenue from subscriptions." },
      { q: "What's the difference between contraction and churned MRR?", a: "Contraction is downgraded revenue from retained customers. Churned MRR is revenue lost from customers that fully cancel." },
      { q: "Does MRR include annual contracts?", a: "Typically you normalize annual contracts to a monthly equivalent (annual contract value / 12) so MRR is comparable across billing terms." },
      { q: "Should I report gross or net MRR?", a: "Use net MRR for growth reporting and track gross MRR to isolate churn impact. Keep definitions consistent across periods." },
      { q: "How do usage-based charges fit into MRR?", a: "If usage is predictable, include a normalized monthly average. Otherwise track usage revenue separately to avoid volatile MRR." }
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
      "One-time fees and usage spikes are typically excluded from ARR; track them separately.",
      "ARR is not bookings or billings; report those metrics separately."
    ],
    inputGuidance: [
      "Use normalized MRR (annual contracts divided by 12).",
      "Exclude one-time fees and non-recurring services.",
      "Use a recent stable month for run-rate reporting.",
      "Keep ARR in the same currency and definitions across time.",
      "If you have large seasonal swings, average across multiple months.",
      "If usage revenue is volatile, use a trailing 3-month MRR average."
    ],
    validationChecks: [
      "ARR should equal MRR x 12.",
      "If MRR is 0, ARR should be 0.",
      "If ARR differs from booked revenue, confirm you are using run-rate.",
      "ARR should move in the same direction as normalized MRR."
    ],
    scenarios: [
      {
        title: "SMB SaaS baseline",
        detail: "Use 50k MRR to compute a 600k ARR run-rate."
      },
      {
        title: "Scale-up run-rate",
        detail: "Use 200k MRR to estimate a 2.4M ARR run-rate for board reporting."
      },
      {
        title: "Seasonal business",
        detail: "Average three months of MRR to avoid overstating ARR during peaks."
      }
    ],
    edgeCases: [
      "If MRR includes one-time fees, ARR will be overstated.",
      "If MRR is volatile, a single month can mislead; average multiple months.",
      "If currency changes, normalize before comparing ARR across periods.",
      "If billing cadence changes mid-period, recompute normalized MRR before annualizing."
    ],
    faq: [
      { q: "Is ARR the same as annual revenue?", a: "Not necessarily. ARR is an annualized run rate from recurring subscriptions, not booked or recognized revenue." },
      { q: "How should I treat one-time fees?", a: "One-time fees are usually excluded from ARR. If they recur predictably, consider reporting them separately." },
      { q: "Why does ARR matter?", a: "ARR is a standard SaaS growth metric for tracking run-rate and comparing performance across periods and cohorts." },
      { q: "Should I use contracted ARR or reported ARR?", a: "Use contracted ARR for bookings and reported ARR for financial performance. Keep them separated to avoid confusion." },
      { q: "Can ARR decrease even if bookings are up?", a: "Yes. ARR is based on current run-rate MRR. Bookings can rise while churn or downgrades reduce the run-rate." },
      { q: "How do I handle multi-year contracts?", a: "Normalize the recurring portion to a monthly run rate, then annualize. Non-recurring services should stay out of ARR." }
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
      "For a compounding view, retained revenue is approximately MRR x (1 - churn%)^12."
    ],
    assumptions: [
      "This is a simple estimate and does not model new sales, expansions, or seasonality.",
      "If churn varies by cohort or plan, segment your inputs for accuracy.",
      "Revenue churn can differ from logo churn; use revenue churn when available.",
      "Annual churned revenue here is a linear estimate, not a compounding model."
    ],
    inputGuidance: [
      "Use revenue churn, not logo churn, for financial impact.",
      "Enter a monthly churn rate, not an annualized percentage.",
      "Use a recent cohort or trailing average to avoid seasonality bias.",
      "If you track net churn, use it to reflect expansion offsets.",
      "Run a low and high churn scenario to understand sensitivity.",
      "If churn is segmented by plan, model each plan separately and sum."
    ],
    validationChecks: [
      "Monthly churned revenue should equal MRR x churn rate.",
      "Annual churned revenue should equal monthly churned revenue x 12.",
      "If churn exceeds 20%, confirm you are using the correct period.",
      "If churn rate is above 100%, inputs are invalid."
    ],
    scenarios: [
      {
        title: "Low churn SaaS",
        detail: "2% monthly churn on 50k MRR to quantify manageable losses."
      },
      {
        title: "High churn SaaS",
        detail: "5% monthly churn to highlight annual revenue leakage risk."
      },
      {
        title: "Churn sensitivity",
        detail: "Compare 2% vs 4% churn to show how small changes drive large impact."
      },
      {
        title: "Pricing change stress test",
        detail: "Increase churn by 1-2 points to estimate downside risk from a price increase."
      }
    ],
    edgeCases: [
      "If churn rate is 0, churned revenue will be 0; verify this is realistic.",
      "If churn exceeds 100%, input is invalid and should be corrected.",
      "If MRR is 0, churned revenue will be 0; confirm you have active revenue.",
      "Very high churn rates can make linear annual estimates misleading; consider compounding."
    ],
    faq: [
      { q: "Is this logo churn or revenue churn?", a: "This calculator uses revenue churn. Logo churn can be very different depending on customer mix." },
      { q: "Is annual churn just monthly churn x 12?", a: "This tool shows a simple annualized estimate. For higher churn rates, compounding effects can make the true annual impact larger." },
      { q: "What churn rate should I enter?", a: "Use a recent cohort-based revenue churn rate (gross or net). If you only have logo churn, treat this as a directional estimate." },
      { q: "What is the difference between gross and net churn?", a: "Gross churn looks only at lost revenue. Net churn includes expansion and contraction, which can offset churn." },
      { q: "How do I reflect cohort improvements?", a: "Run separate scenarios for older cohorts vs new cohorts to see how churn improvements affect the annual loss." }
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
      "Implied lifetime (months) is approximately 1 / churn rate (for a simple constant churn model).",
      "Gross profit per month = ARPA x gross margin.",
      "LTV = gross profit per month x implied lifetime."
    ],
    assumptions: [
      "This uses a simple churn-based lifetime approximation and assumes constant churn.",
      "If churn is very low (near 0), LTV can be unrealistically large; use a capped lifetime or cohort data.",
      "This does not model expansion revenue unless you explicitly use net churn and an expansion-aware ARPA.",
      "ARPA is assumed to be steady over time without a usage ramp."
    ],
    inputGuidance: [
      "Use ARPA as monthly recurring revenue per account, not total revenue.",
      "Use gross margin after direct COGS to avoid overstating LTV.",
      "Enter monthly churn as a percentage, not annual churn.",
      "If churn is very low, cap lifetime to keep LTV realistic.",
      "Use net churn if expansion materially offsets churn.",
      "Use ARPA net of discounts, credits, and refunds."
    ],
    validationChecks: [
      "Implied lifetime should equal 1 / churn rate (as a decimal).",
      "LTV should equal ARPA x gross margin x lifetime.",
      "If churn is 0, LTV is not meaningful; enter a small churn floor.",
      "Gross margin should be between 0 and 100; validate inputs if it is not."
    ],
    scenarios: [
      {
        title: "SMB LTV",
        detail: "ARPA 100 with 4% churn to estimate conservative lifetime value."
      },
      {
        title: "Mid-market LTV",
        detail: "ARPA 450 with 2% churn to model longer retention and higher LTV."
      },
      {
        title: "Churn reduction impact",
        detail: "Compare 3% vs 2% churn to see LTV sensitivity."
      },
      {
        title: "Expansion-adjusted LTV",
        detail: "Increase ARPA to reflect upsell and see the impact on LTV."
      }
    ],
    edgeCases: [
      "If churn is 0, lifetime is infinite; set a practical churn floor.",
      "If gross margin is near 0, LTV will be near 0 regardless of ARPA.",
      "If ARPA is 0, LTV will be 0; confirm pricing inputs.",
      "If churn is above 50% monthly, implied lifetime is under two months."
    ],
    faq: [
      { q: "What is ARPA?", a: "Average Revenue Per Account (ARPA) is your average subscription revenue per customer per month." },
      { q: "Why is lifetime about 1 / churn?", a: "For a simple constant churn model, the expected lifetime in months is approximately the inverse of the monthly churn rate." },
      { q: "Should I use gross or net churn?", a: "For LTV, many teams start with gross revenue churn to avoid over-crediting expansion. Use net churn if your model explicitly includes expansion dynamics." },
      { q: "Do I include implementation fees in ARPA?", a: "No. One-time fees should be tracked separately so LTV reflects recurring value." },
      { q: "How do I cap LTV for long-tenure customers?", a: "Use a maximum lifetime based on historical cohorts (for example, 60 months) to avoid overstating value." },
      { q: "Should I use contribution margin instead of gross margin?", a: "If onboarding, support, or infra costs scale with customers, contribution margin can be a more realistic input." }
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
      "If gross profit per month is near zero, payback is effectively unbounded.",
      "This assumes customers reach full ARPA immediately; ramped usage will extend payback."
    ],
    inputGuidance: [
      "Use CAC for a specific segment, not blended across all channels.",
      "ARPA should be monthly recurring revenue per account.",
      "Use contribution margin if onboarding or support costs are significant.",
      "Exclude one-time fees so payback reflects recurring profitability.",
      "Compare payback to your cash runway or target recovery window.",
      "If usage ramps over time, use a lower early-month ARPA to avoid overstating payback speed."
    ],
    validationChecks: [
      "Gross profit per month should equal ARPA x gross margin.",
      "Payback months should equal CAC / gross profit per month.",
      "If gross profit is near zero, payback should be very large.",
      "If payback is under one month, confirm CAC and ARPA inputs."
    ],
    scenarios: [
      {
        title: "SMB payback",
        detail: "CAC 1,200 with ARPA 200 to target an 8-month payback."
      },
      {
        title: "Enterprise payback",
        detail: "Higher CAC with higher ARPA to validate a 6-12 month payback window."
      },
      {
        title: "Margin stress test",
        detail: "Lower gross margin to see how payback lengthens."
      },
      {
        title: "Product-led growth",
        detail: "Low CAC with modest ARPA to validate a short payback period."
      }
    ],
    edgeCases: [
      "If gross profit per month is 0, payback is undefined; check margin input.",
      "If CAC is 0, payback is 0; confirm CAC includes all acquisition costs.",
      "Very low ARPA can produce unrealistic payback; recheck segment inputs.",
      "If gross margin is 0, payback is unbounded regardless of CAC."
    ],
    faq: [
      { q: "What is a good payback period?", a: "It depends on your market and cash constraints. Many SaaS businesses target 6-12 months, but there is no universal rule." },
      { q: "What should be included in CAC?", a: "Include sales and marketing spend allocated per new customer (ads, SDR/AE costs, commissions, tools). Keep your definition consistent across periods." },
      { q: "Should I use gross margin or contribution margin?", a: "Gross margin is a common starting point. If fulfillment costs are significant (support, onboarding, infra), contribution margin can be a better payback signal." },
      { q: "How do I handle ramped revenue?", a: "If customers ramp usage over time, use a lower ARPA for early months to avoid overstating payback speed." },
      { q: "Does sales cycle length affect payback?", a: "Payback starts after revenue begins, but long sales cycles increase cash needs. Track CAC payback alongside sales cycle length." },
      { q: "Should I include free trial costs in CAC?", a: "Yes, if trial infrastructure, support, or marketing spend is material and tied to acquisition." }
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
      "If you have ramp time (onboarding, usage ramp), effective payback will be longer.",
      "ARPA is assumed to be steady without a ramp unless you adjust inputs."
    ],
    inputGuidance: [
      "Use a target payback window that matches your cash flow constraints.",
      "ARPA should be monthly recurring revenue after discounts.",
      "Use contribution margin if fulfillment costs are significant.",
      "Use a realistic monthly churn rate for the segment you are acquiring.",
      "Compare break-even CAC to actual CAC to see if acquisition is sustainable.",
      "Use net churn only if expansion is predictable and stable."
    ],
    validationChecks: [
      "Break-even CAC should equal gross profit per month x target payback months.",
      "LTV should equal gross profit per month x implied lifetime.",
      "LTV:CAC should be greater than 1 for a healthy model.",
      "Break-even CAC should not exceed LTV for long-term viability."
    ],
    scenarios: [
      {
        title: "SMB acquisition",
        detail: "ARPA 120 with 4% churn and 8-month payback to find a safe CAC ceiling."
      },
      {
        title: "Mid-market acquisition",
        detail: "Higher ARPA with lower churn to see how CAC capacity expands."
      },
      {
        title: "Ramp-up impact",
        detail: "Increase payback months to reflect longer onboarding or adoption."
      },
      {
        title: "High churn segment",
        detail: "Higher churn to show how CAC capacity shrinks when retention is weak."
      }
    ],
    edgeCases: [
      "If target payback is 0, break-even CAC will be 0; set a realistic window.",
      "If churn is 0, LTV becomes unbounded; use a churn floor.",
      "If gross margin is low, break-even CAC will be low.",
      "If churn is high, LTV can fall below break-even CAC quickly."
    ],
    faq: [
      { q: "Why show LTV:CAC?", a: "It is a common SaaS sanity-check metric. This tool estimates it using break-even CAC and simple LTV." },
      { q: "What does break-even CAC mean here?", a: "It's the CAC you can afford to recover within your target payback window based on gross profit per month." },
      { q: "How should I pick target payback months?", a: "Shorter payback is safer for cash flow. Many teams choose 6-12 months depending on sales cycle length, expansion, and capital constraints." },
      { q: "Should I use segment-specific CAC?", a: "Yes. CAC varies widely by channel and segment, so break-even CAC should be calculated per segment." },
      { q: "How do I use this with LTV targets?", a: "Compare break-even CAC to your actual CAC and ensure LTV:CAC exceeds your internal target (often 3x)." },
      { q: "What if LTV:CAC is below 1?", a: "It means your acquisition is not paying back within a reasonable lifetime. Revisit pricing, retention, or CAC efficiency." }
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
    inputGuidance: [
      "Use the current price and customer count for the segment you will reprice.",
      "Expected churn should be incremental churn caused by the increase.",
      "If you grandfather existing customers, lower the affected customer count.",
      "Run multiple scenarios (best/base/worst) to bound risk.",
      "Consider contract terms and annual vs monthly mix for accuracy.",
      "If contracts are annual, convert to a monthly equivalent before modeling."
    ],
    validationChecks: [
      "Revenue before should equal customers x current price.",
      "Revenue after should equal customers x (1 - churn) x new price.",
      "If expected churn exceeds break-even churn, revenue should drop.",
      "Break-even churn should be between 0 and 100 when price increase is positive."
    ],
    scenarios: [
      {
        title: "Small price increase",
        detail: "5% increase with 1% churn to estimate low-risk uplift."
      },
      {
        title: "Moderate increase",
        detail: "10% increase with 2% churn to compare revenue before and after."
      },
      {
        title: "High-risk increase",
        detail: "20% increase with higher churn to test downside scenarios."
      },
      {
        title: "Grandfathered cohort",
        detail: "Lower the affected customer count to model grandfathered renewals."
      }
    ],
    edgeCases: [
      "If customer count is 0, revenue before and after will be 0.",
      "If expected churn exceeds 100%, input is invalid.",
      "If price increase is 0, revenue change should be driven only by churn.",
      "If price increase is negative, the break-even churn threshold will be negative."
    ],
    faq: [
      { q: "What is break-even churn?", a: "It is the churn rate at which the higher price produces the same revenue as before. If actual churn is lower, the increase raises revenue." },
      { q: "How can I estimate churn from a price increase?", a: "Use a range (best/base/worst). Segment by customer size, contract term, and price sensitivity. You can also run limited experiments or grandfather existing customers." },
      { q: "Does this model packaging changes?", a: "No. It's a simple sensitivity calculator for a single price point. For packaging changes, model migration by segment and expected conversion." },
      { q: "Should I grandfather existing customers?", a: "If churn risk is high, grandfathering can reduce churn but delays revenue uplift. Model both paths." },
      { q: "How do I estimate break-even churn?", a: "Use this output as a threshold. If your expected churn is below it, the increase should lift revenue." }
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
    inputGuidance: [
      "Use your current monthly list price as the baseline.",
      "Apply the discount to the annual prepay total, not the monthly price.",
      "Check fees and taxes if they impact net revenue.",
      "Use segment-specific discounts if enterprise and SMB pricing differ.",
      "Compare effective monthly rate to competitor annual plans.",
      "Set a discount ceiling that preserves your target gross margin."
    ],
    validationChecks: [
      "Effective monthly rate should be less than or equal to the monthly price.",
      "Annual price should equal monthly price x 12 x (1 - discount).",
      "Effective monthly rate should equal annual price / 12.",
      "Savings should equal (monthly price x 12) minus annual price.",
      "If discount is 0, annual price should equal monthly price x 12."
    ],
    scenarios: [
      {
        title: "10% annual discount",
        detail: "Apply a 10% discount to a $49 monthly plan to compare effective monthly price."
      },
      {
        title: "15% annual discount",
        detail: "Use a higher discount to model competitive prepay incentives."
      },
      {
        title: "Enterprise pricing",
        detail: "Apply discount to a higher monthly price to evaluate cash impact."
      },
      {
        title: "Low discount test",
        detail: "Model a 5% discount to see if modest incentives still work."
      }
    ],
    edgeCases: [
      "If discount is 0, annual price should equal monthly price x 12.",
      "If discount is 100%, annual price will be 0; confirm this is intentional.",
      "If monthly price is 0, effective monthly rate will be 0.",
      "If discount exceeds 30-40%, validate margin impact before offering."
    ],
    faq: [
      { q: "What annual discount is common?", a: "Many SaaS businesses offer 10-20% off for annual prepay, but it depends on segment and cash needs." },
      { q: "Why offer an annual discount at all?", a: "Annual prepay can improve cash flow and reduce churn risk. The discount trades some revenue for commitment and lower collection overhead." },
      { q: "How should I think about effective monthly rate?", a: "Effective monthly rate is just the annual prepay spread over 12 months. It helps compare monthly vs annual plans on the same basis." },
      { q: "Should discounts vary by segment?", a: "Yes. Enterprise buyers may expect smaller discounts than SMB, especially if contracts are multi-year." },
      { q: "Does prepay reduce churn?", a: "Often yes, but you should validate with cohort data. Treat churn reduction as a separate assumption." }
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
    scenarios: [
      {
        title: "Small team with heavy usage",
        detail: "Few seats but high unit usage to see if usage pricing becomes more expensive."
      },
      {
        title: "Large team with light usage",
        detail: "Many seats and low usage to test if seat pricing is more predictable."
      },
      {
        title: "Balanced workload",
        detail: "Medium seats and medium usage to see where models converge."
      }
    ],
    edgeCases: [
      "If seats are 0, seat model total will be 0; ensure you are modeling active users.",
      "If unit price is 0, usage model total will be 0; check for missing pricing.",
      "Very high usage can make usage pricing exceed seat pricing even with fewer seats."
    ],
    faq: [
      { q: "When is seat-based pricing better?", a: "Seat-based pricing is usually simpler when usage per user is predictable and value maps closely to active users." },
      { q: "When is usage-based pricing better?", a: "Usage-based pricing often fits APIs and infra-heavy products where costs and value scale with consumption." },
      { q: "How do minimums or tiers change the result?", a: "If you have minimums, tiered pricing, or volume discounts, use this tool as a baseline and then adjust using scenario presets for your tier thresholds." },
      { q: "Should I compare based on list price or discounts?", a: "Use realized pricing for the segment you are modeling, including typical discounts or volume commitments." },
      { q: "How do I handle hybrid pricing?", a: "Model the seat component in the seat price and add the usage component to the unit price for a blended comparison." }
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
    scenarios: [
      {
        title: "Starter API plan",
        detail: "1M calls per month with small fixed overhead to set a starter monthly price."
      },
      {
        title: "High-volume plan",
        detail: "10M calls per month with lower infra cost to price a volume tier."
      },
      {
        title: "Free tier impact",
        detail: "Reduce billable calls to reflect free usage and compare price sensitivity."
      }
    ],
    edgeCases: [
      "If calls per month are 0, price per 1,000 calls is undefined; use a minimum fee.",
      "If infra cost is 0, margin can look inflated; confirm true unit costs.",
      "If target margin is too high, price may become uncompetitive."
    ],
    faq: [
      { q: "What should I enter for infra cost per 1,000 calls?", a: "Use your blended marginal cost per 1,000 calls (compute, queueing, DB, vendor APIs, observability)." },
      { q: "How do I handle free tiers or included calls?", a: "Model included calls as part of your plan design. You can estimate cost at expected usage (including free tier) and then set pricing tiers around meaningful breakpoints." },
      { q: "What gross margin should an API target?", a: "It depends on your category and scale. Start with a range (70-90%) and sanity-check competitiveness and cost recovery under different workloads." },
      { q: "Should I price per call or per 1,000 calls?", a: "Per 1,000 calls is easier to read on pricing pages while still mapping to unit costs. The calculator supports both interpretations." },
      { q: "How do I model a minimum monthly fee?", a: "Set a base platform fee outside this calculator, then use the implied price per 1,000 calls for overages." }
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
    scenarios: [
      {
        title: "Infra-only API",
        detail: "Set vendor cost to 0 to estimate pure infra cost per call."
      },
      {
        title: "Vendor-heavy API",
        detail: "Increase vendor cost per 1,000 calls to model third-party pass-through costs."
      },
      {
        title: "High-volume API",
        detail: "Scale calls to 10M+ to check if cost per call stabilizes."
      }
    ],
    edgeCases: [
      "If calls per month are 0, cost per call will be undefined; use a minimum volume.",
      "If vendor cost is higher than infra cost, verify pass-through assumptions.",
      "If fixed overhead is large, cost per call can be misleading at low volume."
    ],
    faq: [
      { q: "Should support costs be included?", a: "If support scales with customer count, treat it as semi-variable and include a portion in fixed overhead for pricing decisions." },
      { q: "Why do I need vendor cost per 1,000 calls?", a: "Many APIs have pass-through costs (LLMs, enrichment, third-party APIs). Including them prevents margin surprises." },
      { q: "How should I model spiky traffic?", a: "Use a few presets (p50 vs p90 monthly calls) and compare the cost per call under each scenario." },
      { q: "Do I include bandwidth or storage here?", a: "Only if they scale with calls and you want a single blended unit cost; otherwise model them separately." },
      { q: "Can I use this for non-API usage?", a: "Yes. Replace calls with any repeatable unit (jobs, events, messages) as long as costs scale with that unit." }
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
    scenarios: [
      {
        title: "Small storage plan",
        detail: "100 GB average stored to test a starter storage add-on."
      },
      {
        title: "Large storage plan",
        detail: "1 TB average stored to validate enterprise storage pricing."
      },
      {
        title: "Replication overhead",
        detail: "Increase cost per GB-month to reflect multi-region replication."
      }
    ],
    edgeCases: [
      "If average GB stored is 0, the model will not produce a meaningful price.",
      "If cost per GB-month is 0, verify whether storage costs are included elsewhere.",
      "If fixed overhead dominates, consider a base fee plus per-GB pricing."
    ],
    faq: [
      { q: "Is this the same as cloud storage price?", a: "No. This estimates your selling price based on your costs and target margin." },
      { q: "Should I include request costs?", a: "If your workload has heavy requests, include them via the storage cost calculator or add them to fixed overhead." },
      { q: "What unit should I show on my pricing page?", a: "GB-month is common because it reflects storage over time. Add an example workload so buyers can estimate their bill." },
      { q: "How do I handle minimum fees?", a: "Add a base fee and keep GB-month as the variable component. This protects margin at low usage." },
      { q: "Should I charge for replication separately?", a: "If replication is optional, consider a premium tier or add-on; otherwise include it in your cost per GB-month." }
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
    scenarios: [
      {
        title: "Starter tier usage",
        detail: "Monthly units just above included usage to test initial overage behavior."
      },
      {
        title: "Growth tier usage",
        detail: "Monthly units that span tier 1 and tier 2 to test blended rates."
      },
      {
        title: "Enterprise overage",
        detail: "High usage beyond tier 2 to check tier 3 pricing impact."
      }
    ],
    edgeCases: [
      "If included units exceed monthly units, overage should be 0.",
      "If tier 1 units are 0, all overage should roll into tier 2 or tier 3.",
      "If tier prices increase with volume, effective price will rise; confirm this is intentional."
    ],
    faq: [
      { q: "How should I pick included units?", a: "Included usage should cover a typical small customer and reduce bill shock. Use a platform fee to cover baseline overhead." },
      { q: "Should tiers be based on total usage or overage usage?", a: "Most pricing pages describe total usage tiers. This calculator uses overage units for clarity: included units are free within the platform fee, then tiers apply." },
      { q: "How do I avoid bill shock?", a: "Use a predictable platform fee, publish example bills, and consider usage alerts or caps for unusual spikes." },
      { q: "Should tier prices always decline?", a: "Most models offer volume discounts, but if costs rise at scale you can keep tiers flat or even increase them." },
      { q: "How do I model minimum commitments?", a: "Set the platform fee to represent the minimum and apply tiers to usage above that commitment." }
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
    scenarios: [
      {
        title: "Low egress plan",
        detail: "500 GB per month to model a starter plan with low traffic."
      },
      {
        title: "High egress plan",
        detail: "2 TB per month to test pricing for bandwidth-heavy customers."
      },
      {
        title: "Multi-region traffic",
        detail: "Increase cost per GB to reflect higher-cost regions or CDN mix."
      }
    ],
    edgeCases: [
      "If GB per month is 0, the model only reflects fixed overhead.",
      "If cost per GB is 0, confirm CDN or egress pricing is not missing.",
      "If target margin is too high, price may exceed market benchmarks."
    ],
    faq: [
      { q: "Is this a CDN pricing calculator?", a: "It's a cost and price estimator. Enter your own per-GB costs and assumptions." },
      { q: "What cost per GB should I use?", a: "Use a blended egress cost per GB after discounts, tiers, and CDN mix. If you have multiple regions, use a weighted average." },
      { q: "Should I include origin fetch and request costs?", a: "If request pricing is meaningful for your workload, include it in fixed overhead or model it separately and add it to the monthly cost." },
      { q: "How do I handle free CDN tiers?", a: "Treat free tiers as a lower blended cost per GB or subtract a fixed free allowance before pricing." },
      { q: "What if bandwidth is a pass-through cost?", a: "Use a lower target margin or price bandwidth as a separate line item to keep usage transparent." }
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
      "Use presets for low and high request intensity workloads.",
      "Use billing exports to validate request rates and costs."
    ],
    validationChecks: [
      "Request cost should equal (requests / 10,000) x cost per 10,000 requests.",
      "Monthly cost should increase when either GB stored or request volume increases.",
      "Effective price per GB-month should exceed unit cost at your target margin.",
      "Monthly cost should be at least storage cost plus request cost."
    ],
    scenarios: [
      {
        title: "Read-heavy storage",
        detail: "High request volume with moderate GB stored to test request-driven costs."
      },
      {
        title: "Archive storage",
        detail: "High GB stored with low requests to test storage-driven costs."
      },
      {
        title: "Balanced storage",
        detail: "Moderate GB and requests to reflect typical SaaS file usage."
      },
      {
        title: "Multi-replica storage",
        detail: "Increase cost per GB-month to account for replication and backups."
      }
    ],
    edgeCases: [
      "If requests per month are 0, request cost should be 0.",
      "If avg GB stored is 0, the model reflects request costs only.",
      "If request costs dominate, consider a per-request add-on.",
      "If cost per GB-month is 0, verify storage costs are included elsewhere."
    ],
    faq: [
      { q: "What counts as a request?", a: "Any operation you want to price against (GET/PUT/LIST, reads/writes). Use your provider's definition." },
      { q: "Can I include egress?", a: "Yes - use the bandwidth tool and combine the two estimates for a full storage product model." },
      { q: "Should I use peak or average stored GB?", a: "Use average GB-month for cost. If customers have spiky storage, consider modeling a higher average or adding a minimum/overage policy." },
      { q: "How do I handle lifecycle tiers?", a: "Use a blended cost per GB-month based on the storage mix across tiers." },
      { q: "Should I charge separately for requests?", a: "If requests drive meaningful cost, keep a request component or add-on to avoid margin leakage." },
      { q: "Should I separate hot and cold storage pricing?", a: "Yes. Different storage classes have different costs and access patterns, so separate tiers often improve margin and clarity." }
    ]
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

