import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  CalculatorIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "1031 Exchange Tools | Calculators and Resources",
  description: `Interactive 1031 exchange calculators and tools for ${PRIMARY_CITY} investors. Boot calculator, cost estimator, and identification rules checker.`,
  alternates: {
    canonical: `${SITE_DOMAIN}/tools`,
  },
  openGraph: {
    title: "1031 Exchange Tools | Calculators and Resources",
    description: `Interactive 1031 exchange calculators and tools for ${PRIMARY_CITY} investors.`,
    type: "website",
    url: `${SITE_DOMAIN}/tools`,
  },
};

const tools = [
  {
    slug: "boot-calculator",
    name: "Boot Calculator",
    description:
      "Calculate boot including cash received and mortgage relief, and estimate tax implications.",
    icon: ScaleIcon,
  },
  {
    slug: "exchange-cost-estimator",
    name: "Exchange Cost Estimator",
    description:
      "Estimate qualified intermediary fees, escrow costs, title insurance, and recording fees.",
    icon: CalculatorIcon,
  },
  {
    slug: "identification-rules-checker",
    name: "Identification Rules Checker",
    description:
      "Validate your identification against the three property, two hundred percent, or ninety five percent rules.",
    icon: ShieldCheckIcon,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
          ]}
        />

        <section className="pt-8">
          <header className="mb-12 max-w-3xl">
            <p className="section-label mb-3">Resources</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Exchange Tools
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Interactive calculators and tools to help {PRIMARY_CITY} investors understand 1031
              exchange requirements, estimate costs, and validate compliance.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden bg-mansion-navy p-6 text-white transition hover:bg-mansion-navy-light"
                >
                  <Icon className="mb-4 h-10 w-10 text-mansion-gold" aria-hidden="true" />
                  <h2 className="font-serif text-xl text-white">
                    {tool.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{tool.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mansion-gold-light">
                    Use Tool
                    <svg
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            <p className="font-semibold text-mansion-gold-dark">Educational Tools Only</p>
            <p className="mt-2">
              These tools provide estimates and educational information only. Results are not tax,
              legal, or investment advice. Consult a qualified intermediary and tax advisor before
              making decisions.
            </p>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "1031 Exchange Tools",
            description: `Interactive calculators and tools for ${PRIMARY_CITY} investors`,
            url: `${SITE_DOMAIN}/tools`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: tools.map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: tool.name,
                  description: tool.description,
                  url: `${SITE_DOMAIN}/tools/${tool.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
