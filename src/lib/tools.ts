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

export type ToolWalkthrough = {
  title: string;
  steps: string[];
};

export type ToolClusterLink = {
  href: string;
  label: string;
};

export type ToolSourceKind = "internal-input" | "supporting-page" | "external-reference";

export type ToolSource = {
  label: string;
  kind: ToolSourceKind;
  href?: string;
  note?: string;
};

export type ToolDefinition = {
  slug: string;
  title: string;
  name?: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  reviewedBy?: string;
  reviewed?: string;
  sources?: ToolSource[];
  inputs: ToolInput[];
  outputs: ToolOutput[];
  related: string[];
  presets?: ToolPreset[];
  howItWorks?: string[];
  assumptions?: string[];
  inputGuidance?: string[];
  validationChecks?: string[];
  commonMistakes?: string[];
  interpretation?: string[];
  useCases?: ToolScenario[];
  walkthroughs?: ToolWalkthrough[];
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

export const SEO_PRIORITY_TOOL_SLUGS = [
  "storage-cost-calculator",
  "compute-cost-estimator",
  "api-pricing-calculator",
  "usage-based-pricing-calculator",
  "annual-discount-calculator"
] as const;

export const CORE_TOOL_CLUSTER_LINKS: Readonly<Record<string, ToolClusterLink[]>> = {
  "bandwidth-cost-calculator": [
    { href: "/guides/bandwidth-pricing-guide/", label: "Guide: bandwidth pricing guide" },
    { href: "/guides/bandwidth-pricing-guardrails/", label: "Guide: bandwidth pricing guardrails" },
    { href: "/guides/cdn-cost-pass-through/", label: "Guide: CDN cost pass-through" },
    { href: "/glossary/egress/", label: "Glossary: egress" },
    { href: "/glossary/bandwidth/", label: "Glossary: bandwidth" }
  ],
  "storage-cost-calculator": [
    { href: "/guides/storage-costs-and-pricing/", label: "Guide: storage costs and pricing" },
    { href: "/guides/price-per-gb-month-explained/", label: "Guide: price per GB-month explained" },
    { href: "/guides/storage-retrieval-fees/", label: "Guide: storage retrieval fees" },
    { href: "/glossary/gb-month/", label: "Glossary: GB-month" },
    { href: "/glossary/minimum-commitment/", label: "Glossary: minimum commitment" }
  ],
  "compute-cost-estimator": [
    { href: "/guides/saas-gross-margin-targets/", label: "Guide: SaaS gross margin targets" },
    { href: "/guides/compute-cost-modeling/", label: "Guide: compute cost modeling" },
    { href: "/guides/minimum-commitment-model/", label: "Guide: minimum commitment modeling" },
    { href: "/glossary/unit-cost/", label: "Glossary: unit cost" },
    { href: "/glossary/gross-margin/", label: "Glossary: gross margin" }
  ],
  "api-pricing-calculator": [
    { href: "/guides/api-cost-estimation/", label: "Guide: API cost estimation" },
    { href: "/guides/api-pricing-model/", label: "Guide: API pricing model" },
    { href: "/glossary/api-call/", label: "Glossary: API call" },
    { href: "/glossary/rate-limit/", label: "Glossary: rate limit" },
    { href: "/glossary/overage/", label: "Glossary: overage" }
  ],
  "usage-based-pricing-calculator": [
    { href: "/guides/value-metric-selection/", label: "Guide: value metric selection" },
    { href: "/guides/usage-based-pricing-examples/", label: "Guide: usage-based pricing examples" },
    { href: "/guides/minimum-commitment-model/", label: "Guide: minimum commitment modeling" },
    { href: "/glossary/value-metric/", label: "Glossary: value metric" },
    { href: "/glossary/usage-based-pricing/", label: "Glossary: usage-based pricing" },
    { href: "/glossary/overage/", label: "Glossary: overage" }
  ],
  "annual-discount-calculator": [
    { href: "/guides/minimum-commitment-model/", label: "Guide: minimum commitment modeling" },
    { href: "/guides/annual-prepay-discount/", label: "Guide: annual prepay discount" },
    { href: "/glossary/annual-prepay-discount/", label: "Glossary: annual prepay discount" },
    { href: "/glossary/churn/", label: "Glossary: churn" },
    { href: "/glossary/billing-cycle/", label: "Glossary: billing cycle" }
  ]
};

export const TOOLS: ToolDefinition[] = [
  {
    slug: "usage-based-pricing-calculator",
    title: "Usage-Based Pricing Calculator",
    name: "Price Per Unit Calculator for Usage-Based Pricing",
    description:
      "Calculate a margin-safe price per unit from usage, unit cost, fixed overhead, and target margin. Compare scenarios and export results for pricing review.",
    metaTitle: "Usage-Based Pricing Calculator & Price Per Unit Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe price per unit from usage, unit cost, fixed overhead, and target margin. Compare p50 and p90 scenarios, set a pricing floor, and decide when a platform fee or minimum commitment is needed.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-03-31",
    sources: [
      {
        kind: "internal-input",
        label: "Usage distribution, blended unit cost, and pricing-floor review",
        note: "Check p50 and p90 usage, blended marginal cost, and the revenue floor needed before publishing a pure usage price."
      },
      {
        kind: "supporting-page",
        label: "Value Metric Selection",
        href: "/guides/value-metric-selection/",
        note: "Confirm the billable unit is easy for buyers to forecast and still maps to the value they receive."
      },
      {
        kind: "supporting-page",
        label: "SaaS Gross Margin Targets",
        href: "/guides/saas-gross-margin-targets/",
        note: "Check whether the required unit price still clears your gross-margin guardrail once heavier accounts are included."
      },
      {
        kind: "supporting-page",
        label: "Minimum Commitment Modeling",
        href: "/guides/minimum-commitment-model/",
        note: "Use a minimum spend or platform fee when fixed-cost recovery is too uneven to leave entirely inside the variable rate."
      }
    ],
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
      "Choose one billable unit customers can forecast (per API call, per 1,000 calls, per GB, or per event).",
      "Use a blended unit cost that includes infra, vendor APIs, and any per-unit third-party fees.",
      "Put support, on-call, and tooling into fixed cost unless they scale directly with usage.",
      "Align target gross margin with your finance policy so pricing is comparable across tools.",
      "If you have a free tier, reduce paid units to reflect expected free usage.",
      "If usage ramps during onboarding, use a lower initial unit volume to avoid underpricing."
    ],
    validationChecks: [
      "Required price per unit should be above unit cost; if not, check margin or fixed cost inputs.",
      "Fixed cost per unit = fixed cost / monthly units. Compare it to unit cost for sanity.",
      "Estimated gross margin should be close to your target; large gaps suggest a math or input issue.",
      "Compare implied price per unit against competitor ranges to confirm market realism.",
      "If fixed cost per unit dominates total cost, consider a base platform fee."
    ],
    commonMistakes: [
      "Choosing a usage unit that customers cannot estimate.",
      "Ignoring free-tier usage when modeling paid units.",
      "Using only p50 usage and skipping p90 stress tests.",
      "Setting margin targets without including all COGS inputs.",
      "Skipping a base fee when fixed costs are material."
    ],
    interpretation: [
      "Treat the required unit price as your floor, not necessarily your list price.",
      "Use the required unit price together with a platform fee or minimum commitment when fixed-cost recovery is too uneven across accounts.",
      "Use the floor to decide what should stay inside included usage and what should move into overage pricing.",
      "If required price per unit swings between p50 and p90, use tiered breakpoints and clear overage guardrails.",
      "Use p50 and p90 scenarios to decide tier boundaries and overage rates.",
      "Compare the implied price to competitors to confirm market fit."
    ],
    useCases: [
      {
        title: "API metering",
        detail: "Price per call or per 1,000 calls and validate the margin with blended unit costs."
      },
      {
        title: "Event analytics",
        detail: "Charge per event or per million events while recovering fixed overhead with a base fee."
      },
      {
        title: "Per-GB pricing",
        detail: "Estimate a per-GB floor for storage or bandwidth when cost and usage are metered monthly."
      }
    ],
    walkthroughs: [
      {
        title: "Set a margin-safe unit price",
        steps: [
          "Enter p50 monthly units and your blended unit cost.",
          "Add fixed overhead and target gross margin.",
          "Use required unit price as the pricing floor."
        ]
      },
      {
        title: "Validate with heavy usage",
        steps: [
          "Increase monthly units to a p90 scenario.",
          "Check if margin holds at scale.",
          "Adjust base fee or tiering if needed."
        ]
      },
      {
        title: "Included usage and overage review",
        steps: [
          "Start with the floor and decide how much usage a typical customer should receive before overages apply.",
          "Check whether that included usage still leaves room to recover fixed cost through the base fee or minimum commitment.",
          "Use overage pricing only for consumption above the predictable baseline."
        ]
      },
      {
        title: "Convert API cost estimate to price per 1,000 calls",
        steps: [
          "Set monthly units to total API calls and divide your variable cost to a per-call value.",
          "Use target margin to calculate required price per call.",
          "Multiply by 1,000 to convert to a price per 1,000 calls for packaging."
        ]
      }
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
      },
      {
        title: "Free tier impact",
        detail: "Reduce paid units to reflect free usage and test whether a platform fee is needed."
      },
      {
        title: "Enterprise minimum commit",
        detail: "Model a customer with predictable baseline usage plus expansion headroom to decide whether a minimum commit should replace pure pay-as-you-go pricing."
      }
    ],
    edgeCases: [
      "If monthly units are 0, pricing will be undefined; use a minimum platform fee instead.",
      "If target margin is 100%, the required price will be infinite. Use a realistic margin ceiling.",
      "If unit cost is 0, price is driven only by fixed cost allocation.",
      "If monthly units are very low, price per unit can be misleading without a base fee."
    ],
    faq: [
      {
        q: "How do I calculate price per unit?",
        a: "Price per unit = (unit cost + fixed cost per unit) / (1 - target gross margin). This calculator applies that formula using your inputs."
      },
      {
        q: "How do I choose a value metric before setting price per unit?",
        a: "Choose a unit customers already understand, forecast, and connect to value, such as API calls, events, minutes, or GB. If buyers cannot explain the metric, the pricing page will usually underperform."
      },
      {
        q: "How do I decide what should be included usage versus overage?",
        a: "Let included usage cover the predictable baseline a buyer can estimate before purchase, then use overage for expansion above that baseline. If fixed cost recovery depends too much on unpredictable overage, move more revenue into a platform fee or minimum commitment."
      },
      {
        q: "When is fixed cost per unit too high for pure usage pricing?",
        a: "If fixed cost per unit stays large even at realistic p50 volume, pure usage pricing can force an unstable headline rate. That is usually a sign you need a platform fee, a minimum commitment, or both."
      },
      {
        q: "When should I add a platform fee or minimum commitment?",
        a: "Add one when low-volume accounts cannot cover fixed support, infrastructure, or onboarding cost through the variable rate alone. A minimum commitment is especially useful when customers have a predictable baseline usage floor."
      },
      {
        q: "How do I test whether gross margin still holds at higher usage?",
        a: "Use p50 and p90 scenarios with the same unit economics. If required price or gross margin changes materially at higher usage, you likely need tiered breakpoints, overage guardrails, or a minimum spend."
      },
      {
        q: "Is this a usage based pricing calculator?",
        a: "Yes. It estimates a per-unit price from costs and a target margin, which is the core pricing step for usage-based models."
      },
      {
        q: "What is usage-based pricing?",
        a: "Usage-based pricing charges customers based on consumption (calls, events, GB, minutes) instead of seats or flat tiers."
      },
      {
        q: "What should I use for cost per unit?",
        a: "Use your marginal cost for one unit (compute time, bandwidth, storage requests, vendor fees) in your chosen currency."
      },
      {
        q: "Can I use this for per-GB pricing?",
        a: "Yes. Set monthly units to your total billable GB, use your blended cost per GB, and the calculator will return a required per-GB price at your target margin."
      },
      {
        q: "How do I turn a unit-price floor into tiers or annual pricing?",
        a: "Use the required unit price as the floor, then design included usage, tier breakpoints, and annual terms around it. The floor tells you how low the blended economics can go before discounts or packaging start hurting margin."
      },
      {
        q: "Should I include payment fees or taxes in unit cost?",
        a: "Include any fees that scale with revenue or usage if they materially affect margin. Taxes are usually excluded from pricing models."
      }
    ]
  },
  {
    slug: "compute-cost-estimator",
    title: "Compute Cost Estimator",
    name: "Compute Pricing Calculator from vCPU and Memory Costs",
    description:
      "Estimate compute costs from vCPU-hours, memory GB-hours, and fixed overhead, then turn them into a margin-safe monthly compute price.",
    metaTitle: "Compute Pricing Calculator & Monthly Price Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe compute price from vCPU-hours, memory GB-hours, blended unit cost, fixed overhead, and target gross margin. Compare baseline and heavier workloads, set a price floor, and decide when a platform fee or minimum commitment is needed.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-03-31",
    sources: [
      {
        kind: "internal-input",
        label: "Blended capacity cost and reserved-capacity review",
        note: "Check vCPU-hour and GB-hour blended costs plus reserved-capacity assumptions before locking the pricing floor."
      },
      {
        kind: "supporting-page",
        label: "SaaS Gross Margin Targets",
        href: "/guides/saas-gross-margin-targets/",
        note: "Confirm your margin guardrails before turning compute costs into published pricing."
      },
      {
        kind: "supporting-page",
        label: "Compute Cost Modeling",
        href: "/guides/compute-cost-modeling/",
        note: "Use this guide when raw infrastructure inputs need a clearer cost model before pricing."
      },
      {
        kind: "supporting-page",
        label: "Minimum Commitment Modeling",
        href: "/guides/minimum-commitment-model/",
        note: "Decide when a base platform fee or minimum spend is required to cover structural fixed costs."
      }
    ],
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
      "Convert monthly cloud bill data into blended vCPU-hour and GB-hour rates before setting compute plan pricing.",
      "Model steady-state hours rather than burst peaks unless you bill for peak capacity.",
      "Keep bandwidth and storage in their own calculators to avoid double counting.",
      "Include on-call and monitoring in fixed cost if they are required for uptime.",
      "Compare a small and large workload scenario using presets.",
      "If you use reserved capacity, use the effective blended rate."
    ],
    validationChecks: [
      "Monthly cost should equal vCPU cost + memory cost + fixed overhead.",
      "Effective price per vCPU-hour should exceed your cost per vCPU-hour at the target margin.",
      "Gross margin should be near the target; otherwise review fixed cost or unit rates.",
      "If fixed overhead dominates, consider a base platform fee."
    ],
    commonMistakes: [
      "Using peak hours instead of average steady-state usage.",
      "Mixing on-demand and reserved pricing without a blended rate.",
      "Double counting storage or bandwidth in compute costs.",
      "Omitting support or on-call overhead from fixed costs.",
      "Assuming autoscaling removes the need for baseline capacity."
    ],
    interpretation: [
      "Treat the recommended monthly price as a floor that anchors tiered plans or flat commitments.",
      "Use the floor to decide when a flat monthly plan is still honest and when compute should move into committed tiers, included usage, or overages.",
      "Use p50 and p90 capacity scenarios to see whether the floor still covers blended unit cost at scale.",
      "If fixed compute cost dominates at low volume, add a platform fee or minimum commitment to protect margin.",
      "Stress-test the floor with heavier workloads before publishing a compute pricing page."
    ],
    useCases: [
      {
        title: "Compute-heavy SaaS",
        detail: "Model a core plan where compute dominates COGS and set a margin-safe price."
      },
      {
        title: "Enterprise workload",
        detail: "Estimate pricing for a large customer with steady vCPU and memory demand."
      },
      {
        title: "Internal platform chargeback",
        detail: "Translate shared infrastructure usage into a defensible monthly charge for product teams or business units."
      }
    ],
    walkthroughs: [
      {
        title: "Baseline compute pricing",
        steps: [
          "Enter vCPU-hours, memory GB-hours, and unit costs.",
          "Add fixed overhead and target margin.",
          "Use recommended price as a plan baseline."
        ]
      },
      {
        title: "Tier comparison",
        steps: [
          "Run a small workload and note effective price per vCPU-hour.",
          "Run a larger workload with lower unit costs.",
          "Use the spread to set tier pricing."
        ]
      },
      {
        title: "Monthly plan versus commitment review",
        steps: [
          "Start with the recommended monthly price for the baseline workload you expect to sell most often.",
          "Check whether fixed overhead is forcing the plan to carry too much recovery work for smaller accounts.",
          "If it is, move the packaging toward minimum commitments, included baseline capacity, or committed tiers."
        ]
      },
      {
        title: "Reserved-capacity sanity check",
        steps: [
          "Enter your blended post-commit vCPU and memory rates from recent billing data.",
          "Compare the recommended monthly price against an on-demand scenario.",
          "Use the difference to decide whether commitment savings belong in list price or margin protection."
        ]
      }
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
      },
      {
        title: "Burst-prone workload",
        detail: "Increase vCPU-hours to simulate peak usage and validate margin."
      },
      {
        title: "Committed-use baseline",
        detail: "Use blended reserved-capacity rates and steady-state workload assumptions to price a committed production environment."
      }
    ],
    edgeCases: [
      "If vCPU-hours and GB-hours are both 0, the estimate should reflect fixed overhead only.",
      "Very low unit costs with high fixed overhead can produce unintuitive prices; recheck cost allocation.",
      "If target margin is near 0, recommended price will be close to cost and may be unviable."
    ],
    faq: [
      {
        q: "When is fixed compute cost too high for pure variable pricing?",
        a: "If your fixed capacity spend makes the floor climb above competitive benchmarks, add a base platform fee or commitment."
      },
      {
        q: "When should I keep compute pricing as a flat monthly plan?",
        a: "Keep a flat monthly plan when the baseline workload is predictable, buyers value budget certainty, and heavier customers do not materially distort the same unit economics. If one fixed monthly number only works for a narrow band of usage, it is no longer the honest default package."
      },
      {
        q: "How should I choose a baseline workload before pricing compute?",
        a: "Start with a representative steady-state workload that matches the customer segment you actually want to sell. Then run a heavier scenario so you can see whether the same floor still works when compute demand spikes."
      },
      {
        q: "How should I treat reserved capacity or savings plans in pricing?",
        a: "Blend reserved-capacity rates into your blended unit costs before calculating the margin-safe floor."
      },
      {
        q: "When should compute pricing move to included usage or overages?",
        a: "Move there when a single monthly plan hides too much divergence between baseline and heavier workloads. Included usage can cover the expected baseline capacity, while overages or larger commitment bands protect margin for customers that consume far more compute than the default plan assumes."
      },
      {
        q: "Should I price compute as a monthly plan or as included usage plus overages?",
        a: "Use a monthly plan when workloads are stable and buyers value predictability. Move to included usage plus overages when compute demand can expand materially across accounts and you need a clearer way to protect margin above the baseline workload."
      },
      {
        q: "When should I add a platform fee or minimum commitment?",
        a: "Add one whenever low-volume workloads cannot cover fixed infrastructure, monitoring, or support costs through usage rates."
      },
      {
        q: "How do I turn a compute floor into included usage or committed tiers?",
        a: "Use the floor as the minimum economics for the baseline workload you want to include, then build committed tiers or included usage around that level. Put heavier consumption into overages or larger commitment bands if the same blended rate would otherwise erode margin."
      },
      {
        q: "How do I test whether gross margin survives heavier workloads?",
        a: "Run p50 and p90 scenarios through the same unit economics and watch how margin shifts before publishing new tiers."
      },
      {
        q: "How do I turn a compute price floor into committed tiers or minimums?",
        a: "Use the floor as your lowest tier or included usage level, then layer in commitments and overages based on margin sensitivity."
      },
      {
        q: "What if memory-heavy and CPU-heavy workloads need different pricing?",
        a: "If one workload shape materially changes blended unit cost, do not force both into one public compute rate. Use separate tiers, clearer packaging guardrails, or enterprise exceptions so your cheaper cohort does not subsidize the more expensive one."
      },
      {
        q: "What if one public compute rate stops fitting very different workload shapes?",
        a: "That usually means the packaging has become too broad. Split the rate into clearer segments, committed tiers, or included-baseline structures so one customer shape is not quietly subsidizing another."
      },
      {
        q: "Should regional cost differences be blended into one compute price?",
        a: "Blend regions into one price only when the cost spread is modest and the buyer experience stays simple. If one region is materially more expensive, use regional guardrails or enterprise pricing exceptions instead of letting one global rate hide the difference."
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
    commonMistakes: [
      "Mixing fixed and variable costs in the same bucket.",
      "Using a single spike month instead of an average.",
      "Double counting discounts or credits across buckets.",
      "Leaving out vendor APIs or managed services in other costs.",
      "Ignoring support, security, or on-call overhead."
    ],
    interpretation: [
      "Use monthly cloud cost as the baseline for margin and runway planning.",
      "If variable costs dominate, focus optimization on unit costs or usage efficiency.",
      "If fixed costs dominate, move them into a platform fee or minimum.",
      "Track this monthly to spot margin drift early."
    ],
    useCases: [
      {
        title: "All-in cost baseline",
        detail: "Sum compute, storage, and bandwidth to set a realistic gross margin target."
      },
      {
        title: "Cost spike diagnosis",
        detail: "Identify which cost bucket is growing fastest and prioritize optimization."
      }
    ],
    walkthroughs: [
      {
        title: "Monthly baseline",
        steps: [
          "Enter average monthly compute, storage, and bandwidth costs.",
          "Add other variable costs and fixed overhead.",
          "Use monthly cloud cost as your baseline."
        ]
      },
      {
        title: "Optimization check",
        steps: [
          "Reduce one cost bucket by 10-20%.",
          "Compare variable vs fixed cost changes.",
          "Prioritize the biggest savings lever."
        ]
      }
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
    related: ["arr-calculator", "ltv-calculator", "churn-impact-calculator", "nrr-calculator"],
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
    commonMistakes: [
      "Mixing bookings or billings with MRR; only recurring revenue belongs here.",
      "Double counting contractions and churned MRR in the same period.",
      "Using partial-month data that overstates or understates real MRR trends.",
      "Treating reactivations inconsistently across months."
    ],
    interpretation: [
      "Use net new MRR as the primary growth signal for the month.",
      "If net new MRR is negative, focus on churn and contraction drivers first.",
      "Compare expansion to churn to understand how upgrades offset losses.",
      "Track this monthly to spot trend changes early."
    ],
    useCases: [
      {
        title: "Board reporting",
        detail: "Summarize growth using ending MRR and net new MRR each month."
      },
      {
        title: "Pricing change monitoring",
        detail: "Track expansion and contraction after packaging or pricing updates."
      }
    ],
    walkthroughs: [
      {
        title: "Monthly rollup",
        steps: [
          "Enter starting MRR and all movement inputs.",
          "Review ending MRR and net new MRR.",
          "Use growth percent as a trend indicator."
        ]
      },
      {
        title: "Churn vs expansion",
        steps: [
          "Increase churned MRR to stress the model.",
          "Adjust expansion MRR to see offsets.",
          "Set targets for net new MRR recovery."
        ]
      }
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
    slug: "nrr-calculator",
    title: "Net Revenue Retention (NRR) Calculator",
    description: "Calculate net revenue retention from starting MRR plus expansion, contraction, and churn.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "startingMrr", label: "Starting MRR", type: "number", defaultValue: "50000", min: "0", step: "0.01" },
      { name: "expansionMrr", label: "Expansion MRR", type: "number", defaultValue: "4500", min: "0", step: "0.01" },
      { name: "contractionMrr", label: "Contraction MRR", type: "number", defaultValue: "1200", min: "0", step: "0.01" },
      { name: "churnedMrr", label: "Churned MRR", type: "number", defaultValue: "2500", min: "0", step: "0.01" }
    ],
    outputs: [
      { name: "endingMrr", label: "Ending MRR", format: "currency" },
      { name: "netRevenueDelta", label: "Net revenue change", format: "currency" },
      { name: "nrrPct", label: "NRR", format: "percent" }
    ],
    related: ["mrr-calculator", "churn-impact-calculator", "ltv-calculator"],
    presets: [
      { label: "Healthy expansion", values: { startingMrr: "80000", expansionMrr: "12000", contractionMrr: "2000", churnedMrr: "3500" } },
      { label: "Retention pressure", values: { startingMrr: "80000", expansionMrr: "5000", contractionMrr: "4000", churnedMrr: "9000" } }
    ],
    howItWorks: [
      "Ending MRR = starting + expansion - contraction - churned.",
      "NRR = ending MRR / starting MRR.",
      "Net revenue change = ending MRR - starting MRR."
    ],
    assumptions: [
      "All inputs are for the same period (usually monthly).",
      "Expansion, contraction, and churn are measured on the same revenue base.",
      "NRR excludes new customer MRR; only existing customer revenue changes are included."
    ],
    inputGuidance: [
      "Exclude new MRR from this model to keep NRR clean.",
      "Use net-of-credits MRR to match finance reporting.",
      "Segment enterprise vs SMB cohorts if expansion behavior differs.",
      "Track NRR monthly to catch expansion or churn shifts early.",
      "Normalize annual contracts to monthly MRR for comparability."
    ],
    validationChecks: [
      "If expansion is 0 and churn > 0, NRR should be below 100%.",
      "If expansion exceeds churn + contraction, NRR should be above 100%.",
      "Ending MRR should never be negative; if it is, review inputs."
    ],
    commonMistakes: [
      "Including new customer MRR in NRR.",
      "Mixing bookings or billings with MRR.",
      "Using annual churn in a monthly NRR model.",
      "Treating downgrades as churn instead of contraction."
    ],
    interpretation: [
      "NRR above 100% means expansion more than offsets churn and contraction.",
      "NRR below 100% signals retention or expansion issues in existing accounts.",
      "Use NRR alongside GRR to understand expansion vs churn health."
    ],
    useCases: [
      {
        title: "Expansion health",
        detail: "Track whether upsell offsets churn in existing customers."
      },
      {
        title: "Cohort performance",
        detail: "Compare NRR across segments or cohorts to spot weak retention."
      }
    ],
    walkthroughs: [
      {
        title: "Monthly NRR rollup",
        steps: [
          "Enter starting MRR for existing customers only.",
          "Add expansion, contraction, and churned MRR.",
          "Review NRR and net revenue change."
        ]
      },
      {
        title: "Stress test churn",
        steps: [
          "Increase churned MRR to a worst-case value.",
          "Check how far NRR falls below 100%.",
          "Set a target expansion plan to recover."
        ]
      }
    ],
    scenarios: [
      {
        title: "Expansion-driven SaaS",
        detail: "High expansion and low churn to validate >120% NRR."
      },
      {
        title: "Contraction risk",
        detail: "Higher downgrades to see how quickly NRR drops."
      },
      {
        title: "Churn spike",
        detail: "Increase churned MRR to model a retention event."
      }
    ],
    edgeCases: [
      "If starting MRR is 0, NRR is undefined; track net revenue change instead.",
      "If churned MRR exceeds starting MRR, ending MRR will be negative; review input scope.",
      "NRR can exceed 200% in aggressive expansion models; validate against reality."
    ],
    faq: [
      { q: "What is NRR?", a: "Net Revenue Retention measures how revenue from existing customers changes over time, including expansion, contraction, and churn." },
      { q: "Does NRR include new customers?", a: "No. NRR only measures revenue from an existing customer base." },
      { q: "What is a good NRR benchmark?", a: "Enterprise SaaS often targets 110-130% NRR, while SMB SaaS may be lower." },
      { q: "How does NRR differ from GRR?", a: "GRR excludes expansion; NRR includes expansion so it can exceed 100%." }
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
    commonMistakes: [
      "Including one-time services or setup fees in MRR before annualizing.",
      "Annualizing a peak month instead of a representative month.",
      "Mixing booked revenue with run-rate ARR in the same report.",
      "Ignoring currency normalization when comparing ARR over time."
    ],
    interpretation: [
      "Use ARR for consistent run-rate reporting, not cash planning.",
      "If ARR jumps unexpectedly, validate the underlying MRR inputs.",
      "Average multiple months when seasonality or usage spikes are common.",
      "Pair ARR with bookings to see pipeline vs run-rate."
    ],
    useCases: [
      {
        title: "Run-rate reporting",
        detail: "Convert stable MRR to ARR for consistent investor updates."
      },
      {
        title: "Forecast sanity check",
        detail: "Compare ARR trends to pipeline bookings to detect gaps."
      }
    ],
    walkthroughs: [
      {
        title: "Convert MRR to ARR",
        steps: [
          "Enter a normalized monthly MRR figure.",
          "Confirm ARR output equals MRR x 12.",
          "Use ARR for run-rate reporting."
        ]
      },
      {
        title: "Seasonal smoothing",
        steps: [
          "Average MRR across 3 recent months.",
          "Use the average as the input.",
          "Compare to last quarter ARR to spot drift."
        ]
      }
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
    commonMistakes: [
      "Using logo churn instead of revenue churn for financial impact.",
      "Entering annual churn as a monthly percentage.",
      "Ignoring cohort differences when churn varies by segment.",
      "Assuming this model accounts for expansion or new sales."
    ],
    interpretation: [
      "Use monthly churned revenue to size the immediate leakage problem.",
      "Treat the annual churned revenue as a directional estimate, not a forecast.",
      "If churn is high, prioritize retention work before pricing changes.",
      "Segment churn results by plan to find the biggest leaks."
    ],
    useCases: [
      {
        title: "Retention prioritization",
        detail: "Quantify the revenue at risk to justify retention initiatives."
      },
      {
        title: "Pricing risk check",
        detail: "Estimate revenue impact if churn rises after a price increase."
      }
    ],
    walkthroughs: [
      {
        title: "Churn leakage estimate",
        steps: [
          "Enter current MRR and monthly churn rate.",
          "Review monthly churned revenue.",
          "Use annual estimate as directional risk."
        ]
      },
      {
        title: "Stress test churn",
        steps: [
          "Increase churn by 1-2 percentage points.",
          "Compare annual churned revenue outputs.",
          "Decide if retention work is urgent."
        ]
      }
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
    slug: "cohort-retention-curve-calculator",
    title: "Cohort Retention Curve Calculator",
    description: "Model a 6-month retention curve from a cohort size and a constant monthly retention rate.",
    inputs: [
      { name: "cohortSize", label: "Starting cohort size", type: "number", defaultValue: "1000", min: "0", step: "1" },
      { name: "monthlyRetentionPct", label: "Monthly retention (%)", type: "number", defaultValue: "95", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "month1RetentionPct", label: "Month 1 retention", format: "percent" },
      { name: "month2RetentionPct", label: "Month 2 retention", format: "percent" },
      { name: "month3RetentionPct", label: "Month 3 retention", format: "percent" },
      { name: "month4RetentionPct", label: "Month 4 retention", format: "percent" },
      { name: "month5RetentionPct", label: "Month 5 retention", format: "percent" },
      { name: "month6RetentionPct", label: "Month 6 retention", format: "percent" },
      { name: "month6Users", label: "Month 6 retained users", format: "number" }
    ],
    related: ["churn-impact-calculator", "ltv-calculator", "mrr-calculator"],
    presets: [
      { label: "Strong retention (97%)", values: { cohortSize: "1000", monthlyRetentionPct: "97" } },
      { label: "Healthy retention (95%)", values: { cohortSize: "1000", monthlyRetentionPct: "95" } },
      { label: "At-risk retention (90%)", values: { cohortSize: "1000", monthlyRetentionPct: "90" } }
    ],
    howItWorks: [
      "We apply the monthly retention rate repeatedly across months.",
      "Month N retention = (monthly retention rate ^ N) x 100.",
      "Month 6 retained users = cohort size x monthly retention rate ^ 6."
    ],
    assumptions: [
      "Retention is modeled as a constant monthly rate for six months.",
      "This is a directional model; real cohorts often vary by month.",
      "Use this for planning and sensitivity, not for exact cohort reporting."
    ],
    inputGuidance: [
      "Use a trailing 3-6 month average retention rate for stability.",
      "If early churn is higher, use the lower rate to be conservative.",
      "Segment cohorts by plan or channel if retention differs materially.",
      "If you have real cohort data, input the actual monthly retention instead.",
      "Use the model to test how small improvements compound over time."
    ],
    validationChecks: [
      "If retention is 100%, all monthly retention outputs should be 100%.",
      "If retention is 0%, all outputs should be 0%.",
      "Month 6 retained users should never exceed cohort size."
    ],
    commonMistakes: [
      "Using annual retention as a monthly value.",
      "Assuming retention is flat when early churn is spiky.",
      "Using logo retention instead of revenue retention for financial planning."
    ],
    interpretation: [
      "Small changes in monthly retention compound quickly over 6 months.",
      "If month 6 retention falls below target, prioritize onboarding and activation.",
      "Use this to set realistic retention goals for new segments."
    ],
    useCases: [
      {
        title: "Retention planning",
        detail: "Estimate how improvements in monthly retention change the 6-month curve."
      },
      {
        title: "Cohort benchmarking",
        detail: "Compare healthy vs at-risk retention scenarios for targets."
      }
    ],
    walkthroughs: [
      {
        title: "Baseline retention curve",
        steps: [
          "Enter your starting cohort size.",
          "Input the monthly retention rate.",
          "Review the 6-month curve and retained users."
        ]
      },
      {
        title: "Retention improvement",
        steps: [
          "Increase retention by 1-2 points.",
          "Observe the month 6 uplift.",
          "Use the delta to size retention investments."
        ]
      }
    ],
    scenarios: [
      {
        title: "Product-market fit",
        detail: "Use 97% retention to model a sticky product cohort."
      },
      {
        title: "New segment",
        detail: "Use 90% retention to model a higher-risk segment."
      },
      {
        title: "Retention program",
        detail: "Improve retention by 2 points to see compounding gains."
      }
    ],
    edgeCases: [
      "If cohort size is 0, all outputs should be 0.",
      "If retention exceeds 100%, clamp to 100%.",
      "Very low retention will reduce month 6 users to near zero."
    ],
    faq: [
      { q: "Is this based on real cohort data?", a: "No. This is a model that assumes a constant monthly retention rate." },
      { q: "Why only 6 months?", a: "Six months covers early retention dynamics where most SaaS churn happens." },
      { q: "Can I use this for revenue retention?", a: "Yes, if the retention rate reflects revenue retention instead of user retention." }
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
    commonMistakes: [
      "Using revenue instead of gross profit as the LTV base.",
      "Plugging in annual churn as a monthly churn rate.",
      "Ignoring expansion and downgrades in ARPA assumptions.",
      "Assuming churn stays constant across all cohorts."
    ],
    interpretation: [
      "Use LTV as a planning range, not a single point estimate.",
      "If LTV is extremely high, check churn inputs and cap lifetime.",
      "Compare LTV to CAC to validate acquisition efficiency.",
      "Segment LTV by plan to guide packaging decisions."
    ],
    useCases: [
      {
        title: "Marketing ROI",
        detail: "Compare LTV to CAC to decide how much you can spend to acquire users."
      },
      {
        title: "Pricing strategy",
        detail: "Model how ARPA changes from new pricing impact long-term value."
      }
    ],
    walkthroughs: [
      {
        title: "Baseline LTV",
        steps: [
          "Enter ARPA, gross margin, and churn rate.",
          "Review implied lifetime and LTV.",
          "Use LTV as a planning range."
        ]
      },
      {
        title: "Sensitivity check",
        steps: [
          "Lower churn by 1 point or raise margin.",
          "Compare LTV changes across scenarios.",
          "Prioritize levers with the biggest lift."
        ]
      }
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
    commonMistakes: [
      "Using blended CAC across channels with very different conversion rates.",
      "Using revenue instead of gross profit to compute payback.",
      "Ignoring usage ramp which extends the payback period.",
      "Mixing annual and monthly ARPA in the same model."
    ],
    interpretation: [
      "Use payback months to set acquisition guardrails by segment.",
      "If payback is too long, improve pricing, margin, or conversion.",
      "Compare payback to cash runway to avoid overextending.",
      "Use this alongside LTV to confirm long-term viability."
    ],
    useCases: [
      {
        title: "Channel evaluation",
        detail: "Compare payback across acquisition channels to prioritize spend."
      },
      {
        title: "Pricing impact",
        detail: "See how ARPA changes from pricing experiments affect payback."
      }
    ],
    walkthroughs: [
      {
        title: "Payback baseline",
        steps: [
          "Enter CAC, ARPA, and gross margin.",
          "Review payback months output.",
          "Compare to your target payback window."
        ]
      },
      {
        title: "Segment compare",
        steps: [
          "Adjust CAC and ARPA for a specific segment.",
          "Compare payback months across segments.",
          "Shift spend to shorter payback segments."
        ]
      }
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
    commonMistakes: [
      "Confusing break-even CAC with maximum CAC based on full LTV.",
      "Using gross churn when net churn is more appropriate for the segment.",
      "Setting a payback window that does not match cash flow reality.",
      "Assuming ARPA is steady despite usage ramp or seasonality."
    ],
    interpretation: [
      "Use break-even CAC as a hard ceiling for paid acquisition.",
      "If break-even CAC is below actual CAC, fix retention or pricing first.",
      "Use the LTV:CAC ratio to compare segments consistently.",
      "Shorten payback targets when cash is tight."
    ],
    useCases: [
      {
        title: "Spend limits",
        detail: "Set maximum CAC targets for each segment before scaling spend."
      },
      {
        title: "Pricing justification",
        detail: "Validate whether a price increase raises your CAC ceiling."
      }
    ],
    walkthroughs: [
      {
        title: "Break-even CAC",
        steps: [
          "Enter ARPA, gross margin, churn, and payback target.",
          "Review break-even CAC and LTV outputs.",
          "Use the result as a CAC ceiling."
        ]
      },
      {
        title: "Tighten payback",
        steps: [
          "Shorten the payback target by a few months.",
          "Compare the reduced CAC ceiling.",
          "Adjust acquisition spend accordingly."
        ]
      }
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
    name: "Price Increase Calculator for Grandfathered Plans",
    description:
      "Model revenue lift, churn risk, and break-even churn for a price increase. Compare fully grandfathered, partially grandfathered, and no-grandfathering scenarios.",
    metaTitle: "Grandfathering Pricing Plans Calculator | PricingNest",
    metaDescription:
      "Model revenue lift, churn risk, and break-even churn for a price increase. Compare fully grandfathered, partially grandfathered, and no-grandfathering scenarios.",
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
    commonMistakes: [
      "Using total customers when only a subset is affected by the increase.",
      "Mixing annual contracts without normalizing to monthly.",
      "Assuming churn is zero for price-sensitive segments.",
      "Forgetting to model grandfathered cohorts separately."
    ],
    interpretation: [
      "If expected churn is below break-even, the increase should lift revenue.",
      "Use multiple scenarios to define safe and aggressive pricing paths.",
      "Segment by plan size to avoid a one-size-fits-all increase.",
      "Use this as a first pass before running a controlled experiment."
    ],
    useCases: [
      {
        title: "Price hike planning",
        detail: "Estimate revenue lift and churn risk before announcing increases."
      },
      {
        title: "Grandfathering decision",
        detail: "Model a smaller affected customer base to evaluate grandfathering."
      }
    ],
    walkthroughs: [
      {
        title: "Small increase test",
        steps: [
          "Enter current price and customer count.",
          "Set a modest price increase and churn assumption.",
          "Review revenue before vs after."
        ]
      },
      {
        title: "Grandfathered cohort",
        steps: [
          "Reduce customer count to only affected accounts.",
          "Re-run the increase scenario.",
          "Compare with the full-base result."
        ]
      }
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
      { q: "How should I handle grandfathering pricing plans?", a: "Start by segmenting customers by contract term and price sensitivity, then model revenue impact for fully grandfathered, partially grandfathered, and no-grandfathering scenarios." },
      { q: "Does this model packaging changes?", a: "No. It's a simple sensitivity calculator for a single price point. For packaging changes, model migration by segment and expected conversion." },
      { q: "Should I grandfather existing customers?", a: "If churn risk is high, grandfathering can reduce churn but delays revenue uplift. Model both paths." },
      { q: "How do I estimate break-even churn?", a: "Use this output as a threshold. If your expected churn is below it, the increase should lift revenue." }
    ]
  },
  {
    slug: "annual-discount-calculator",
    title: "Annual Discount Calculator",
    name: "Annual Discount Calculator",
    description: "Convert a monthly price into annual pricing, annual prepay savings, and an effective monthly rate.",
    metaTitle: "Annual Discount Calculator - Annual Pricing | PricingNest",
    metaDescription:
      "Free annual discount calculator to convert a monthly price into annual pricing, annual prepay savings, and effective monthly rate.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-03-30",
    sources: [
      {
        kind: "internal-input",
        label: "Current monthly list price and annual discount policy",
        note: "Check the active commercial policy first so the calculator reflects real discount guardrails, not only list pricing."
      },
      {
        kind: "supporting-page",
        label: "Annual Prepay Discount",
        href: "/guides/annual-prepay-discount/",
        note: "Use this guide when deciding how much savings to exchange for upfront cash collection."
      },
      {
        kind: "supporting-page",
        label: "Discount Guardrails",
        href: "/guides/discount-guardrails/",
        note: "Review the guardrails before publishing or approving a deeper annual discount."
      }
    ],
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
      "Test 10%, 15%, and 20% annual discount scenarios and compare conversion, cash collection, and effective monthly rate.",
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
    commonMistakes: [
      "Discounting too deeply without validating margin impact.",
      "Applying the discount to the monthly price instead of the annual total.",
      "Ignoring payment processing fees on large prepay invoices.",
      "Assuming annual discounts always reduce churn."
    ],
    interpretation: [
      "Use effective monthly rate to compare annual vs monthly price clarity.",
      "If savings are small, consider lowering the discount or bundling features.",
      "Large discounts should be justified by cash flow or retention gains.",
      "Align discounts with payback and gross margin targets."
    ],
    useCases: [
      {
        title: "Annual plan design",
        detail: "Convert monthly list price into an annual prepay offer."
      },
      {
        title: "Sales negotiation",
        detail: "Compare discount levels to balance cash flow and margin."
      },
      {
        title: "Pricing page benchmark",
        detail: "Check whether your annual headline savings are clear enough to publish on the pricing page without over-discounting."
      }
    ],
    walkthroughs: [
      {
        title: "Annual offer setup",
        steps: [
          "Enter the monthly list price.",
          "Set the annual discount percentage.",
          "Review annual price and savings."
        ]
      },
      {
        title: "Discount testing",
        steps: [
          "Adjust discount by 5-10 points.",
          "Compare effective monthly rate.",
          "Choose the lowest discount that converts."
        ]
      },
      {
        title: "Pricing page annual toggle",
        steps: [
          "Start from the public monthly list price that buyers already see.",
          "Test 10%, 15%, and 20% annual discounts against the same plan.",
          "Choose the option that keeps the annual savings easy to explain without creating a deep margin giveaway."
        ]
      }
    ],
    scenarios: [
      {
        title: "Self-serve SaaS upgrade",
        detail: "Model a standard monthly plan moving to annual prepay so you can compare savings messaging and effective monthly price for self-serve buyers."
      },
      {
        title: "Competitive annual benchmark",
        detail: "Test a stronger annual incentive when competitors already anchor buyers around double-digit prepaid savings."
      },
      {
        title: "Enterprise contract review",
        detail: "Apply an annual discount to a higher-value plan to see how much cash collection you are trading for commitment."
      },
      {
        title: "Low-incentive annual offer",
        detail: "Use a modest discount to see whether a lighter annual incentive still feels publishable on the pricing page."
      },
      {
        title: "Pricing page headline savings",
        detail: "Compare how different annual discounts change the annual savings message and the effective monthly anchor shown on the pricing page."
      }
    ],
    edgeCases: [
      "If discount is 0, annual price should equal monthly price x 12.",
      "If discount is 100%, annual price will be 0; confirm this is intentional.",
      "If monthly price is 0, effective monthly rate will be 0.",
      "If discount exceeds 30-40%, validate margin impact before offering."
    ],
    faq: [
      { q: "How do I choose between a 10% and 20% annual discount?", a: "Start with the smallest discount that still feels meaningful to buyers, then compare the cash-flow gain and margin give-up before increasing it." },
      { q: "Is this an annual pricing calculator?", a: "Yes. It converts a monthly price into an annual prepay price and shows the effective monthly rate and savings." },
      {
        q: "How do I calculate annual price from a monthly plan?",
        a: "Multiply monthly list price by 12, then apply the annual discount to the full yearly amount to get annual prepay price."
      },
      { q: "What annual discount is common?", a: "Many SaaS businesses offer 10-20% off for annual prepay, but it depends on segment and cash needs." },
      { q: "Why offer an annual discount at all?", a: "Annual prepay can improve cash flow and reduce churn risk. The discount trades some revenue for commitment and lower collection overhead." },
      { q: "How should I think about effective monthly rate?", a: "Effective monthly rate is just the annual prepay spread over 12 months. It helps compare monthly vs annual plans on the same basis." },
      { q: "Should discounts vary by segment?", a: "Yes. Enterprise buyers may expect smaller discounts than SMB, especially if contracts are multi-year." },
      { q: "Does prepay reduce churn?", a: "Often yes, but you should validate with cohort data. Treat churn reduction as a separate assumption." },
      { q: "What annual discount should I show on the pricing page?", a: "Show the smallest discount that still feels meaningful to buyers and is easy for sales to explain. For many SaaS teams that lands in the 10-20% range." },
      { q: "Should I anchor annual plans on savings or effective monthly price?", a: "Use both if possible. Savings help with conversion messaging, while effective monthly price helps buyers compare annual and monthly plans on the same basis." }
    ]
  },
  {
    slug: "pricing-tier-optimizer",
    title: "Pricing Tier Optimizer",
    description: "Back into tier prices from a target ARPA and your expected plan mix.",
    inputs: [
      { name: "currency", label: "Currency", type: "select", defaultValue: "USD", options: [...CURRENCY_OPTIONS] },
      { name: "targetArpa", label: "Target ARPA (monthly)", type: "number", defaultValue: "120", min: "0", step: "0.01" },
      { name: "basicSharePct", label: "Basic plan share (%)", type: "number", defaultValue: "60", min: "0", step: "1" },
      { name: "proSharePct", label: "Pro plan share (%)", type: "number", defaultValue: "30", min: "0", step: "1" },
      { name: "enterpriseSharePct", label: "Enterprise plan share (%)", type: "number", defaultValue: "10", min: "0", step: "1" },
      { name: "proMultiplier", label: "Pro price multiplier", type: "number", defaultValue: "2.5", min: "0", step: "0.1" },
      { name: "enterpriseMultiplier", label: "Enterprise price multiplier", type: "number", defaultValue: "6", min: "0", step: "0.1" }
    ],
    outputs: [
      { name: "basicPrice", label: "Basic tier price", format: "currency" },
      { name: "proPrice", label: "Pro tier price", format: "currency" },
      { name: "enterprisePrice", label: "Enterprise tier price", format: "currency" },
      { name: "impliedArpa", label: "Implied ARPA", format: "currency" }
    ],
    related: ["mrr-calculator", "pricing-increase-impact-calculator", "usage-based-pricing-calculator"],
    presets: [
      {
        label: "SMB mix",
        values: {
          targetArpa: "90",
          basicSharePct: "70",
          proSharePct: "25",
          enterpriseSharePct: "5",
          proMultiplier: "2.2",
          enterpriseMultiplier: "5"
        }
      },
      {
        label: "Mid-market mix",
        values: {
          targetArpa: "180",
          basicSharePct: "45",
          proSharePct: "40",
          enterpriseSharePct: "15",
          proMultiplier: "2.8",
          enterpriseMultiplier: "6.5"
        }
      }
    ],
    howItWorks: [
      "We model ARPA as the weighted average of tier prices.",
      "Basic price is solved so the weighted average matches your target ARPA.",
      "Pro and Enterprise prices are set as multipliers of the basic tier."
    ],
    assumptions: [
      "Plan shares represent the expected mix of active customers.",
      "Multipliers capture how much higher Pro and Enterprise prices are vs Basic.",
      "This is a pricing structure model, not a conversion or churn forecast."
    ],
    inputGuidance: [
      "Use an ARPA target that aligns with revenue goals and margin constraints.",
      "If plan shares do not sum to 100, we normalize them automatically.",
      "Set multipliers based on value delivered or competitive benchmarks.",
      "Run multiple mixes to stress-test how pricing shifts with segment mix.",
      "Validate the final prices against willingness-to-pay research."
    ],
    validationChecks: [
      "Implied ARPA should match your target ARPA.",
      "If all plan shares are 0, prices will be 0; set a realistic mix.",
      "If multipliers are 1, all tiers will be priced the same."
    ],
    commonMistakes: [
      "Using a target ARPA without validating CAC or payback impact.",
      "Setting enterprise multipliers too low for high-touch costs.",
      "Ignoring how mix shifts can change ARPA over time.",
      "Comparing prices to competitors without aligning on value."
    ],
    interpretation: [
      "Use the basic tier price as your public anchor.",
      "If prices look too high, reduce the target ARPA or adjust the mix.",
      "If prices look too low, increase multipliers or shift mix assumptions."
    ],
    useCases: [
      {
        title: "Tier price design",
        detail: "Translate a revenue target into concrete tier prices."
      },
      {
        title: "Mix sensitivity",
        detail: "See how a shift toward Pro customers changes pricing."
      }
    ],
    walkthroughs: [
      {
        title: "Set a pricing ladder",
        steps: [
          "Enter your target ARPA and expected plan mix.",
          "Set Pro and Enterprise multipliers.",
          "Review suggested tier prices."
        ]
      },
      {
        title: "Test mix shift",
        steps: [
          "Increase Pro share and reduce Basic share.",
          "Check how tier prices move.",
          "Use the range to set guardrails."
        ]
      }
    ],
    scenarios: [
      {
        title: "SMB-heavy mix",
        detail: "High Basic share with lower ARPA to test entry-level pricing."
      },
      {
        title: "Enterprise mix",
        detail: "Higher Enterprise share and larger multipliers to reflect high-touch costs."
      },
      {
        title: "Upsell focus",
        detail: "Increase Pro share to model a successful upgrade strategy."
      }
    ],
    edgeCases: [
      "If multipliers are 0, all prices will be 0; use realistic multipliers.",
      "If target ARPA is 0, all prices will be 0.",
      "Extremely high multipliers can push enterprise pricing beyond market norms."
    ],
    faq: [
      { q: "Does this estimate conversion rates?", a: "No. It only solves for prices based on ARPA and plan mix." },
      { q: "How should I set multipliers?", a: "Use competitor ranges, value differentiation, and cost-to-serve data." },
      { q: "What if my plan mix changes over time?", a: "Re-run this model quarterly or after a major packaging change." }
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
      "Run a low-usage and high-usage scenario to see where each model breaks.",
      "If you offer platform fees, add them to the seat model before comparing."
    ],
    validationChecks: [
      "Seat model total should equal seats x price per seat.",
      "Usage model total should equal monthly units x price per unit.",
      "The cheaper model should flip when you increase seats or decrease usage.",
      "If both models are identical, check that your inputs are not zeroed.",
      "If usage model is always cheaper, recheck unit price or usage assumptions."
    ],
    commonMistakes: [
      "Using licensed seats instead of active seats.",
      "Comparing list price seats to discounted usage pricing.",
      "Ignoring minimum commitments or platform fees.",
      "Using mismatched usage units across models.",
      "Assuming usage is uniform across all seats."
    ],
    interpretation: [
      "Use the difference output to decide when hybrid pricing is needed.",
      "If usage pricing is always cheaper, add minimums or base fees.",
      "If seat pricing is always cheaper, add overages for heavy usage.",
      "Test several team sizes to align tiers with real segments."
    ],
    useCases: [
      {
        title: "Seat vs usage decision",
        detail: "Compare models before launching a new pricing page."
      },
      {
        title: "Hybrid pricing design",
        detail: "See when to add usage overages to seat-based plans."
      }
    ],
    walkthroughs: [
      {
        title: "Compare models",
        steps: [
          "Enter seats, seat price, usage, and unit price.",
          "Review the total cost difference.",
          "Use the cheaper model as a baseline."
        ]
      },
      {
        title: "Hybrid trigger",
        steps: [
          "Increase usage while keeping seats constant.",
          "See where usage pricing exceeds seat pricing.",
          "Add overages or minimums accordingly."
        ]
      }
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
      },
      {
        title: "Active seat billing",
        detail: "Reduce seats to active users only and compare with usage pricing."
      }
    ],
    edgeCases: [
      "If seats are 0, seat model total will be 0; ensure you are modeling active users.",
      "If unit price is 0, usage model total will be 0; check for missing pricing.",
      "Very high usage can make usage pricing exceed seat pricing even with fewer seats.",
      "If monthly units are 0, usage pricing will be 0; confirm expected baseline usage."
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
    name: "API Pricing Calculator for Cost per 1,000 Calls",
    description:
      "Estimate a margin-safe API plan price and price per 1,000 calls from billable volume, infra cost, fixed overhead, and target gross margin.",
    metaTitle: "API Pricing Calculator & Price Per 1,000 Calls Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe API price from call volume, infra cost per 1,000 calls, fixed overhead, and target gross margin. Compare billable-call scenarios, set a price floor, and decide when a platform fee or minimum commitment is needed.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-03-31",
    sources: [
      {
        kind: "internal-input",
        label: "Billable-call mix, blended infra cost, and pricing-floor review",
        note: "Review current volume, blended cost per 1,000 calls, and the revenue floor before publishing an API price."
      },
      {
        kind: "supporting-page",
        label: "Value Metric Selection",
        href: "/guides/value-metric-selection/",
        note: "Confirm the billable metric is something buyers can forecast and justify."
      },
      {
        kind: "supporting-page",
        label: "API Pricing Model",
        href: "/guides/api-pricing-model/",
        note: "Review packaging patterns for rate limits, free tiers, and overage logic before shipping the plan."
      },
      {
        kind: "supporting-page",
        label: "Minimum Commitment Modeling",
        href: "/guides/minimum-commitment-model/",
        note: "Decide when a platform fee or minimum spend is necessary to recover fixed costs."
      }
    ],
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
      "Map projected traffic into billable calls after free credits before setting list price per 1,000 calls.",
      "If you have free tiers, reduce paid calls to reflect actual billable usage.",
      "Include vendor or model costs in fixed overhead if they are not per-call.",
      "Use the target gross margin your finance team expects for API products.",
      "If you charge a platform fee, subtract it from the recommended monthly price."
    ],
    validationChecks: [
      "Implied price per 1,000 calls should be above infra cost per 1,000 calls.",
      "Recommended monthly price should always exceed monthly cost.",
      "Gross margin should match your target within rounding.",
      "If calls are very low, the implied price per 1,000 calls may look high; consider a minimum fee."
    ],
    commonMistakes: [
      "Using total company call volume instead of plan-level volume.",
      "Mixing per-call and per-1,000 call units in the same model.",
      "Ignoring free-tier or included usage assumptions.",
      "Forgetting to add fixed overhead or vendor costs.",
      "Treating the output as a final price without market sanity checks."
    ],
    interpretation: [
      "Treat the recommended monthly price and per-1,000-call output as a floor that informs tiers, overages, and platform fees.",
      "Combine that floor with a platform fee or minimum commitment when low-volume accounts struggle to cover fixed costs.",
      "Keep rate limits separate from the billable event so traffic controls do not silently become pricing logic.",
      "Use p50 and p90 billable-call scenarios to confirm your margin guardrails still hold during peak load.",
      "Compare the implied price to competitors before turning it into a published rate."
    ],
    useCases: [
      {
        title: "API plan launch",
        detail: "Set an initial API tier price from usage and cost assumptions."
      },
      {
        title: "Volume tiering",
        detail: "Use high-volume inputs to design discounted enterprise tiers."
      },
      {
        title: "LLM or model-backed API packaging",
        detail: "Combine infrastructure cost and fixed model overhead to set a margin-safe API plan before publishing a per-1,000-call rate."
      }
    ],
    walkthroughs: [
      {
        title: "Plan pricing baseline",
        steps: [
          "Enter monthly calls, infra cost, fixed overhead, and margin.",
          "Review the recommended monthly price.",
          "Use implied price per 1,000 calls for overages."
        ]
      },
      {
        title: "Free tier adjustment",
        steps: [
          "Reduce calls to billable usage after free tier.",
          "Recalculate the recommended price.",
          "Validate margin with p90 volume."
        ]
      },
      {
        title: "Billable call and rate-limit review",
        steps: [
          "Confirm the billable API call is an event customers can explain and forecast.",
          "Check that rate limits are protecting abuse or burst traffic instead of hiding weak packaging.",
          "Only after that should you turn the floor into included usage and overage pricing."
        ]
      },
      {
        title: "Base-fee plus overage design",
        steps: [
          "Start with the recommended monthly price for the expected workload.",
          "Decide what portion should be recovered through a platform fee.",
          "Use the remaining amount to back into an overage price per 1,000 calls."
        ]
      }
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
      },
      {
        title: "Platform fee model",
        detail: "Set a base platform fee and use the implied per-1k price for overages."
      },
      {
        title: "Bursty production traffic",
        detail: "Use a higher-volume scenario with the same fixed overhead to test whether margins survive unexpected traffic spikes."
      }
    ],
    edgeCases: [
      "If calls per month are 0, price per 1,000 calls is undefined; use a minimum fee.",
      "If infra cost is 0, margin can look inflated; confirm true unit costs.",
      "If target margin is too high, price may become uncompetitive.",
      "If fixed overhead dominates, consider a base fee plus lower usage rate."
    ],
    faq: [
      {
        q: "Is this an API pricing calculator?",
        a: "Yes. It estimates monthly API cost and the margin-safe monthly price that feeds into your pricing page."
      },
      {
        q: "How do I choose between pricing per call and per 1,000 calls?",
        a: "Per 1,000 calls is more customer-friendly while per call keeps the math internal. Multiply per-call cost by 1,000 to compare or present a friendly per-1,000 rate."
      },
      {
        q: "What should count as a billable API call?",
        a: "Bill for actions that materially drive compute, storage, or vendor cost and that buyers can reasonably forecast."
      },
      {
        q: "How should rate limits relate to billable API calls?",
        a: "Rate limits should protect reliability and abuse boundaries, while the billable API call should stay tied to a commercially clear unit. If the rate limit is doing margin protection work, move that logic into included usage, overage pricing, or a minimum commitment instead."
      },
      {
        q: "When should I add a platform fee or minimum commitment?",
        a: "Add one when low-volume accounts cannot cover fixed support, infrastructure, or onboarding expenses through the variable rate alone."
      },
      {
        q: "How do I test whether gross margin survives heavier traffic?",
        a: "Run p50 and p90 scenarios using the same unit economics. If margin erodes at scale, add tiers, overage guardrails, or minimum spends."
      },
      {
        q: "How do I turn a price-per-1,000-calls floor into included usage and overages?",
        a: "Treat the required price as the floor, then design included usage, platform fees, and overage rates around it."
      },
      {
        q: "What should I enter for infra cost per 1,000 calls?",
        a: "Use your blended marginal cost per 1,000 calls, including compute, queueing, databases, vendor APIs, and observability."
      },
      {
        q: "How do I handle free tiers or included calls?",
        a: "Reduce billable calls to reflect expected paid usage after free credits, then retrace the pricing floor for each scenario."
      },
      {
        q: "What gross margin should an API target?",
        a: "Start with your finance team’s target (typically 70-90%) and sanity-check it against competitor benchmarks before publishing a rate."
      }
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
      "Run a low-volume and high-volume scenario to see cost per call variance.",
      "If usage ramps, model average calls during the first 90 days."
    ],
    validationChecks: [
      "Monthly total cost should equal variable cost plus fixed overhead.",
      "Cost per 1,000 calls should be cost per call x 1,000.",
      "As calls increase, cost per call should trend toward variable unit cost.",
      "If calls are 0, cost per call should be 0; check inputs."
    ],
    commonMistakes: [
      "Leaving vendor or pass-through costs out of the model.",
      "Using peak call volume instead of average volume.",
      "Double counting bandwidth or storage costs elsewhere.",
      "Ignoring support and on-call costs that scale with usage.",
      "Assuming discounted tiers apply to all calls."
    ],
    interpretation: [
      "Use cost per call as the floor for usage pricing decisions.",
      "If vendor costs dominate, consider pass-through pricing or minimums.",
      "Large fixed overhead suggests a base fee plus usage overages.",
      "Re-run after cost changes to keep pricing accurate."
    ],
    useCases: [
      {
        title: "Vendor pass-through",
        detail: "Quantify vendor API costs to decide if they need a separate line item."
      },
      {
        title: "Cost audit",
        detail: "Benchmark unit cost before setting API pricing tiers."
      }
    ],
    walkthroughs: [
      {
        title: "Cost baseline",
        steps: [
          "Enter monthly calls, infra cost, vendor cost, and fixed overhead.",
          "Review cost per call and per 1,000 calls.",
          "Use the output as a pricing floor."
        ]
      },
      {
        title: "Vendor sensitivity",
        steps: [
          "Increase vendor cost per 1,000 calls.",
          "Observe cost per call change.",
          "Decide if pass-through pricing is needed."
        ]
      }
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
      },
      {
        title: "Ramp-up volume",
        detail: "Use lower call volume to estimate early-stage unit cost."
      }
    ],
    edgeCases: [
      "If calls per month are 0, cost per call will be undefined; use a minimum volume.",
      "If vendor cost is higher than infra cost, verify pass-through assumptions.",
      "If fixed overhead is large, cost per call can be misleading at low volume.",
      "Negative inputs are treated as 0; review your data if that happens."
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
      "Validate the target margin against your storage product gross margin goals.",
      "Use billing exports to verify average stored GB."
    ],
    validationChecks: [
      "Recommended price per GB-month should exceed cost per GB-month at your target margin.",
      "Monthly cost should scale linearly with average GB stored.",
      "If average GB stored doubles, recommended monthly price should roughly double.",
      "Effective price per GB-month should exceed cost per GB-month."
    ],
    commonMistakes: [
      "Using peak storage instead of average GB-month.",
      "Ignoring replication, backup, or encryption overhead.",
      "Forgetting fixed overhead at low usage volumes.",
      "Mixing request costs into GB-month without modeling them.",
      "Using list price storage costs instead of blended rates."
    ],
    interpretation: [
      "Use the recommended price as the variable storage rate.",
      "Add a base fee when fixed overhead is a big share of cost.",
      "If costs differ by tier, separate hot and cold storage pricing.",
      "Use scenarios to pick simple, defensible tier breakpoints."
    ],
    useCases: [
      {
        title: "Storage add-on",
        detail: "Set a per GB-month rate for storage capacity add-ons."
      },
      {
        title: "Archive tier",
        detail: "Price a low-cost archive tier with minimal access costs."
      }
    ],
    walkthroughs: [
      {
        title: "GB-month pricing",
        steps: [
          "Enter average GB stored and cost per GB-month.",
          "Add fixed overhead and margin target.",
          "Use the recommended price per GB-month."
        ]
      },
      {
        title: "Low usage check",
        steps: [
          "Set a low average GB value.",
          "Review the recommended monthly price.",
          "Decide if a base fee is required."
        ]
      }
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
      },
      {
        title: "Low usage plan",
        detail: "Low GB stored to see if a base fee is needed to cover fixed costs."
      }
    ],
    edgeCases: [
      "If average GB stored is 0, the model will not produce a meaningful price.",
      "If cost per GB-month is 0, verify whether storage costs are included elsewhere.",
      "If fixed overhead dominates, consider a base fee plus per-GB pricing.",
      "If target margin is near 0, recommended price will be close to cost."
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
      "Validate tiers against your real pricing page to avoid mismatches.",
      "If you use total-usage tiers, convert them into overage tiers for this model."
    ],
    validationChecks: [
      "Overage units should be zero when monthly units are below included units.",
      "Monthly bill should never be below the platform fee.",
      "Blended overage rate should be at or below the tier 1 rate when tiers are used.",
      "Effective price per unit should decline as usage grows if tier prices decline.",
      "Tier 2 and tier 3 usage should only apply after tier 1 is fully used."
    ],
    commonMistakes: [
      "Mixing total-usage tiers with overage tiers without converting.",
      "Setting included units that are far above typical usage.",
      "Making tier prices increase without a cost justification.",
      "Forgetting a base fee to cover fixed costs.",
      "Ignoring bill shock for high-usage customers."
    ],
    interpretation: [
      "Use blended overage rate to check if tiers feel reasonable.",
      "If blended rate drops too fast, reduce discounts or add a base fee.",
      "Included usage should cover typical customers, not heavy users.",
      "Use scenarios to decide tier breakpoints and messaging."
    ],
    useCases: [
      {
        title: "Tiered overages",
        detail: "Estimate bills for customers who exceed included usage."
      },
      {
        title: "Pricing page validation",
        detail: "Check effective unit rates against published tiers."
      }
    ],
    walkthroughs: [
      {
        title: "Tiered bill estimate",
        steps: [
          "Enter base fee, included units, and tier prices.",
          "Input a monthly usage level.",
          "Review monthly bill and blended rate."
        ]
      },
      {
        title: "Tier tuning",
        steps: [
          "Increase tier 1 units or reduce tier prices.",
          "Check blended overage rate.",
          "Adjust until rates match market expectations."
        ]
      }
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
      },
      {
        title: "Bill shock check",
        detail: "Increase monthly units 2x to see if blended rates stay reasonable."
      }
    ],
    edgeCases: [
      "If included units exceed monthly units, overage should be 0.",
      "If tier 1 units are 0, all overage should roll into tier 2 or tier 3.",
      "If tier prices increase with volume, effective price will rise; confirm this is intentional.",
      "If tier 2 units are 0, tier 3 applies immediately after tier 1."
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
    metaTitle: "Bandwidth Pricing Calculator & Price Per GB Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe bandwidth price from monthly GB egress, blended cost per GB, fixed overhead, and target gross margin. Set a price-per-GB floor, decide when bandwidth should be billed separately or passed through, and test CDN-heavy or regional traffic before publishing rates.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-04-02",
    sources: [
      {
        kind: "internal-input",
        label: "Bandwidth billing export review for blended egress cost, CDN mix, and regional traffic share",
        note: "Validate weighted cost per GB, CDN-heavy cohorts, and regional traffic mix before publishing one global bandwidth rate."
      },
      {
        kind: "supporting-page",
        label: "Bandwidth Pricing Guide",
        href: "/guides/bandwidth-pricing-guide/",
        note: "Use this guide to turn blended egress cost into a defendable per-GB price floor."
      },
      {
        kind: "supporting-page",
        label: "Bandwidth Pricing Guardrails",
        href: "/guides/bandwidth-pricing-guardrails/",
        note: "Set overage, spike, and high-traffic guardrails before relying on a single public bandwidth rate."
      },
      {
        kind: "supporting-page",
        label: "CDN Cost Pass-Through",
        href: "/guides/cdn-cost-pass-through/",
        note: "Decide when CDN-heavy traffic should stay inside base pricing versus move to a separate pass-through line item."
      }
    ],
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
      "Test a high-traffic scenario to confirm margins hold at scale.",
      "If you have free transfer, subtract it before entering GB."
    ],
    validationChecks: [
      "Effective price per GB should exceed cost per GB at your target margin.",
      "Recommended price should be greater than or equal to monthly cost.",
      "If fixed cost is zero, confirm you are not missing support overhead.",
      "Monthly cost should equal GB per month x cost per GB plus fixed overhead."
    ],
    commonMistakes: [
      "Using list egress pricing instead of blended rates.",
      "Mixing internal transfer with billable egress.",
      "Ignoring regional cost differences.",
      "Forgetting free transfer allowances or CDN credits.",
      "Leaving out request fees that are material."
    ],
    interpretation: [
      "Treat effective price per GB as the margin-safe floor for the traffic mix you modeled.",
      "If bandwidth cost is volatile or externally billed, test a separate bandwidth line item or pass-through threshold instead of hiding it inside a bundled plan price.",
      "If CDN or origin-driven costs differ materially across cohorts, compare blended and high-traffic scenarios before publishing one public rate.",
      "If regional egress cost varies materially, use regional pricing guardrails or enterprise exceptions instead of forcing one global GB price.",
      "If fixed overhead is meaningful relative to usage, pair bandwidth pricing with a base fee or minimum commitment."
    ],
    useCases: [
      {
        title: "CDN pricing",
        detail: "Estimate margin-safe bandwidth pricing for content delivery."
      },
      {
        title: "High-traffic tiers",
        detail: "Model pricing for customers with large monthly egress."
      }
    ],
    walkthroughs: [
      {
        title: "Egress pricing baseline",
        steps: [
          "Enter monthly GB and blended cost per GB.",
          "Add fixed overhead and margin target.",
          "Review effective price per GB."
        ]
      },
      {
        title: "Cost sensitivity",
        steps: [
          "Increase cost per GB for a high-cost region.",
          "Check the recommended price impact.",
          "Decide if regional pricing is needed."
        ]
      }
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
      },
      {
        title: "CDN offload",
        detail: "Lower cost per GB to model improved cache hit rates."
      }
    ],
    edgeCases: [
      "If GB per month is 0, the model only reflects fixed overhead.",
      "If cost per GB is 0, confirm CDN or egress pricing is not missing.",
      "If target margin is too high, price may exceed market benchmarks.",
      "If cost per GB spikes in a region, consider region-specific pricing."
    ],
    faq: [
      {
        q: "How do I turn blended egress cost into a bandwidth price floor?",
        a: "Add variable egress cost and fixed overhead into monthly cost, divide by expected GB, then apply your target gross-margin buffer to set a defendable floor."
      },
      {
        q: "When should bandwidth be priced as a separate line item?",
        a: "Break bandwidth out when usage varies widely across accounts or when bundling it would force low-usage customers to subsidize heavy ones."
      },
      {
        q: "When should CDN costs be passed through separately?",
        a: "Use a separate pass-through or surcharge when CDN-heavy traffic materially changes margin and a single blended rate would either underprice heavy cohorts or overprice everyone else."
      },
      {
        q: "How should I handle regional egress differences in pricing?",
        a: "Use weighted regional averages for standard plans, then add regional guardrails, enterprise carve-outs, or separate rate cards when one region is materially more expensive."
      },
      {
        q: "When does bandwidth overhead require a base fee or minimum commitment?",
        a: "Add a base fee or minimum commit when support, monitoring, and traffic overhead are too large to recover reliably from per-GB pricing alone."
      },
      {
        q: "Should I use peak or average monthly GB when pricing bandwidth?",
        a: "Use average monthly GB for your baseline, then stress-test traffic spikes or p90 months before publishing public rates."
      },
      {
        q: "How do I test whether margin still holds for traffic spikes or heavy accounts?",
        a: "Run a heavier traffic scenario with higher GB, weaker cache performance, or a costlier regional mix and confirm gross margin still clears your target."
      },
      {
        q: "Can I combine bandwidth with storage or compute in one plan?",
        a: "Yes, but model each cost driver separately first so you know whether a blended plan hides bandwidth risk or needs an explicit overage component."
      }
    ]
  },
  {
    slug: "storage-cost-calculator",
    title: "Storage Cost Calculator",
    name: "Storage Pricing Calculator: Cost Per GB and Monthly Cost",
    description:
      "Estimate monthly storage cost, request fees, and a target price per GB. Use it to turn cost per GB assumptions into a margin-safe storage pricing model.",
    metaTitle: "Storage Pricing Calculator & Price Per GB-Month Floor | PricingNest",
    metaDescription:
      "Calculate a margin-safe storage price from average GB stored, request volume, retrieval-sensitive costs, fixed overhead, and target gross margin. Compare archive and request-heavy workloads, set a price per GB-month floor, and decide when request or retrieval fees should be priced separately.",
    reviewedBy: "PricingNest Editorial Team",
    reviewed: "2026-04-02",
    sources: [
      {
        kind: "internal-input",
        label: "Storage billing export review for GB-month usage, request mix, and retrieval mix",
        note: "Validate average GB stored, request-heavy cohorts, and retrieval-sensitive workloads before setting a single GB-month rate."
      },
      {
        kind: "supporting-page",
        label: "Price Per GB-Month Explained",
        href: "/guides/price-per-gb-month-explained/",
        note: "Use this guide to convert blended storage cost into a defendable price floor by target margin."
      },
      {
        kind: "supporting-page",
        label: "Storage Costs and Pricing",
        href: "/guides/storage-costs-and-pricing/",
        note: "Separate stored-volume economics from request and access behavior before finalizing plan structure."
      },
      {
        kind: "supporting-page",
        label: "Storage Retrieval Fees",
        href: "/guides/storage-retrieval-fees/",
        note: "Decide when retrieval-heavy behavior should stay inside the base rate versus be billed as a separate fee."
      }
    ],
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
      "If request intensity is high, treat requests as a first-class pricing lever instead of only increasing the GB price.",
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
    commonMistakes: [
      "Ignoring request or retrieval fees in the cost model.",
      "Using peak storage instead of average GB-month.",
      "Double counting egress costs in storage and bandwidth.",
      "Skipping replication or backup overhead.",
      "Assuming request rates are flat across all customers."
    ],
    interpretation: [
      "Treat the recommended price per GB-month as the margin-safe floor for the specific workload mix you modeled.",
      "Use included storage for the predictable baseline you want to keep simple, then move heavier or access-sensitive usage into overages or separate charges when one blended rate stops being honest.",
      "If request or retrieval-sensitive costs dominate, test a separate request or retrieval charge instead of inflating the base GB-month rate.",
      "If stored-volume cost dominates and access is predictable, keep a simpler GB-month price with fewer add-ons.",
      "If low-volume accounts cannot cover fixed overhead through variable storage alone, recover that gap with a platform fee or minimum commitment.",
      "Compare archive and request-heavy scenarios to decide when hot and archive tiers need different pricing."
    ],
    useCases: [
      {
        title: "File storage product",
        detail: "Combine GB-month and request costs to price a storage plan."
      },
      {
        title: "Backup pricing",
        detail: "Model backup storage with higher retention and lower access."
      },
      {
        title: "Media or document delivery",
        detail: "Test whether a read-heavy storage product needs a request component instead of a single blended GB-month price."
      }
    ],
    walkthroughs: [
      {
        title: "All-in storage pricing",
        steps: [
          "Enter average GB, request volume, and unit costs.",
          "Add fixed overhead and target margin.",
          "Review the recommended monthly price."
        ]
      },
      {
        title: "Request-heavy workload",
        steps: [
          "Increase requests per month to a high-activity scenario.",
          "Check how recommended price changes.",
          "Decide if a request fee is needed."
        ]
      },
      {
        title: "Base storage versus access-charge review",
        steps: [
          "Start with the price per GB-month floor for the baseline storage pattern you expect most customers to use.",
          "Check whether request, retrieval, or durability-sensitive costs are forcing that base rate too high for low-access accounts.",
          "If they are, keep the base storage price cleaner and move the volatile recovery into separate access charges, overages, or commitments."
        ]
      },
      {
        title: "Archive vs hot-storage comparison",
        steps: [
          "Run one scenario with high stored GB and low request volume.",
          "Run a second scenario with moderate GB and high request intensity.",
          "Use the difference to decide whether hot and cold storage should be separate plans."
        ]
      }
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
      },
      {
        title: "Request-heavy media delivery",
        detail: "Hold stored GB roughly flat while increasing monthly requests to see when request-driven pricing becomes necessary."
      }
    ],
    edgeCases: [
      "If requests per month are 0, request cost should be 0.",
      "If avg GB stored is 0, the model reflects request costs only.",
      "If request costs dominate, consider a per-request add-on.",
      "If cost per GB-month is 0, verify storage costs are included elsewhere."
    ],
    faq: [
      { q: "How do I turn cost per GB-month into a storage price floor?", a: "Add storage, request, retrieval-sensitive, and fixed overhead costs into a monthly total, then divide by average GB-month and apply your gross-margin target to set a defensible floor." },
      { q: "When should I charge separately for requests or retrievals?", a: "Split out request or retrieval fees when access-heavy cohorts materially reduce margin under a single blended GB-month price." },
      { q: "When should included storage be separated from overage storage pricing?", a: "Use included storage for the predictable baseline you want most customers to consume, then move higher-volume or higher-access usage into overages when one blended GB-month rate would hide margin risk." },
      { q: "When should hot and archive storage use different pricing?", a: "Use different tiers when archive workloads are storage-heavy but access-light, while hot workloads carry higher request or retrieval cost intensity." },
      { q: "When does fixed storage overhead require a platform fee or minimum commitment?", a: "Add a platform fee or minimum commitment when fixed monthly overhead cannot be recovered reliably from variable GB-month pricing across smaller accounts." },
      { q: "How do I test whether gross margin still holds for request-heavy workloads?", a: "Run a request-heavy scenario with higher operations and retrieval activity, then confirm gross margin still clears target before publishing a single all-in rate." },
      { q: "Can I include egress?", a: "Yes - use the bandwidth tool and combine the two estimates for a full storage product model." },
      { q: "Should I use peak or average stored GB?", a: "Use average GB-month for cost. If customers have spiky storage, consider modeling a higher average or adding a minimum/overage policy." },
      { q: "How do I handle lifecycle tiers?", a: "Use a blended cost per GB-month based on the storage mix across tiers." },
      { q: "What if replication or durability requirements change the storage cost a lot?", a: "If one customer segment needs materially higher replication, backup, or compliance overhead, treat it as a separate tier or add-on rather than hiding it inside one average storage price." }
    ]
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolName(tool: ToolDefinition): string {
  return tool.name ?? tool.title;
}

export function getToolMetaTitle(tool: ToolDefinition): string {
  return tool.metaTitle ?? tool.title;
}

export function getToolMetaDescription(tool: ToolDefinition): string {
  return tool.metaDescription ?? tool.description;
}

export function getPriorityTools(tools: ToolDefinition[]): ToolDefinition[] {
  const priorityLookup = new Map(SEO_PRIORITY_TOOL_SLUGS.map((slug, index) => [slug, index]));

  return [...tools].sort((a, b) => {
    const aPriority = priorityLookup.get(a.slug);
    const bPriority = priorityLookup.get(b.slug);

    if (aPriority != null && bPriority != null) return aPriority - bPriority;
    if (aPriority != null) return -1;
    if (bPriority != null) return 1;
    return 0;
  });
}

export function getCoreToolClusterLinks(slug: string): ToolClusterLink[] | null {
  return CORE_TOOL_CLUSTER_LINKS[slug] ? [...CORE_TOOL_CLUSTER_LINKS[slug]] : null;
}

