import {
  GLOSSARY_GOVERNANCE as GLOSSARY_GOVERNANCE_DATA,
  GUIDE_GOVERNANCE as GUIDE_GOVERNANCE_DATA,
  STATIC_PAGE_GOVERNANCE as STATIC_PAGE_GOVERNANCE_DATA,
} from "./content-governance-data.mjs";

export type RobotsDirective = "index,follow" | "noindex,follow";

export const GUIDE_GOVERNANCE: Readonly<Record<string, RobotsDirective>> = GUIDE_GOVERNANCE_DATA;

export const GLOSSARY_GOVERNANCE: Readonly<Record<string, RobotsDirective>> = GLOSSARY_GOVERNANCE_DATA;

export const STATIC_PAGE_GOVERNANCE: Readonly<Record<string, RobotsDirective>> = STATIC_PAGE_GOVERNANCE_DATA;

export function getGuideRobots(slug: string): RobotsDirective {
  return GUIDE_GOVERNANCE[slug] ?? "index,follow";
}

export function getGlossaryRobots(slug: string): RobotsDirective {
  return GLOSSARY_GOVERNANCE[slug] ?? "index,follow";
}

export function getStaticPageRobots(pathname: string): RobotsDirective {
  return STATIC_PAGE_GOVERNANCE[pathname] ?? "index,follow";
}
