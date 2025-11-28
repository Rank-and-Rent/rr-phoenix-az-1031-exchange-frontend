import type {
  PageLayoutVariant,
  LayoutAssignments,
  ServiceItem,
  LocationItem,
} from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Standard layout with hero, description, FAQs, and CTA",
    sections: ["hero", "description", "highlights", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
      schema: ["Service", "BreadcrumbList"],
    },
  },
  {
    key: "timeline-focused",
    label: "Timeline Focused",
    description: "Emphasizes deadlines and timeline management",
    sections: ["hero", "timeline", "description", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      toc: true,
      schema: ["Service", "BreadcrumbList"],
    },
  },
  {
    key: "property-first",
    label: "Property First",
    description: "Property types and examples featured prominently",
    sections: ["hero", "property-types", "description", "examples", "faqs", "cta"],
    features: {
      heroStyle: "image",
      sidebar: true,
      schema: ["Service", "BreadcrumbList"],
    },
  },
  {
    key: "process-driven",
    label: "Process Driven",
    description: "Step by step process explanation",
    sections: ["hero", "process", "description", "steps", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      toc: true,
      schema: ["Service", "BreadcrumbList", "HowTo"],
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Compares service options and strategies",
    sections: ["hero", "description", "comparison", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      stickyCta: true,
      schema: ["Service", "BreadcrumbList"],
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean minimal layout with essential information",
    sections: ["hero", "description", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      schema: ["Service", "BreadcrumbList"],
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Map featured prominently at the top",
    sections: ["hero", "map", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "map",
      schema: ["Place", "BreadcrumbList"],
    },
  },
  {
    key: "stats-driven",
    label: "Stats Driven",
    description: "Local statistics and demographics featured",
    sections: ["hero", "stats", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      sidebar: true,
      schema: ["Place", "BreadcrumbList"],
    },
  },
  {
    key: "property-focused",
    label: "Property Focused",
    description: "Property types and inventory featured",
    sections: ["hero", "description", "property-types", "paths", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      schema: ["Place", "BreadcrumbList"],
    },
  },
  {
    key: "service-highlight",
    label: "Service Highlight",
    description: "Services available in location featured",
    sections: ["hero", "description", "services", "paths", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      stickyCta: true,
      schema: ["Place", "BreadcrumbList"],
    },
  },
  {
    key: "narrative",
    label: "Narrative",
    description: "Story driven approach with local context",
    sections: ["hero", "narrative", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      schema: ["Place", "BreadcrumbList"],
    },
  },
  {
    key: "compact",
    label: "Compact",
    description: "Compact layout with essential information",
    sections: ["hero", "description", "paths", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      schema: ["Place", "BreadcrumbList"],
    },
  },
];

function assignLayoutsRoundRobin<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[],
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;
  let lastVariant = "";

  for (const item of items) {
    let attempts = 0;
    let selectedVariant: PageLayoutVariant;

    do {
      selectedVariant = variants[variantIndex % variants.length];
      variantIndex++;
      attempts++;
    } while (selectedVariant.key === lastVariant && attempts < variants.length * 2);

    assignments[item.slug] = selectedVariant.key;
    lastVariant = selectedVariant.key;
  }

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayoutsRoundRobin(servicesData, serviceVariants),
  locations: assignLayoutsRoundRobin(locationsData, locationVariants),
};


