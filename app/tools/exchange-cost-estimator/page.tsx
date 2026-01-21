import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { ExchangeCostEstimator } from "@/components/tools/exchange-cost-estimator";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Exchange Cost Estimator | 1031 Exchange Tools",
  description: `Estimate qualified intermediary fees, escrow costs, title insurance, and recording fees for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} 1031 exchanges.`,
  keywords: [
    "exchange cost calculator",
    "1031 exchange fees",
    "qualified intermediary fees",
    "title insurance calculator",
    `${PRIMARY_CITY} exchange costs`,
  ],
  openGraph: {
    title: "Exchange Cost Estimator | 1031 Exchange Tools",
    description: `Estimate exchange costs for ${PRIMARY_CITY} 1031 exchanges.`,
    type: "website",
    url: `${SITE_DOMAIN}/tools/exchange-cost-estimator`,
  },
  alternates: {
    canonical: `${SITE_DOMAIN}/tools/exchange-cost-estimator`,
  },
};

export default function ExchangeCostEstimatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
          ]}
        />

        <div className="pt-8">
          <header className="mb-8">
            <p className="section-label mb-3">Tool</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Exchange Cost Estimator
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Estimate the costs associated with your 1031 exchange including qualified
              intermediary fees, escrow costs, title insurance, and recording fees for {PRIMARY_CITY}{" "}
              transactions.
            </p>
          </header>

          <ExchangeCostEstimator />

          <div className="mt-8 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            <p className="font-semibold text-mansion-gold-dark">Educational content only.</p>
            <p className="mt-2">
              Not tax, legal, or investment advice. Results are estimates only. Actual costs vary
              by provider and transaction details. Consult a qualified intermediary and tax advisor
              before making decisions. Arizona does not impose a state real estate transfer tax.
              Recording fees and title insurance premiums still apply.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="section-label mb-3">Related</p>
            <h2 className="font-serif text-2xl text-mansion-charcoal">
              Related Resources
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/services/qualified-intermediary-coordination"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Qualified Intermediary Coordination &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/services/escrow-and-title-coordination"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Escrow and Title Coordination &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/boot-calculator"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Boot Calculator &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Exchange Cost Estimator",
            description: `Estimate exchange costs for ${PRIMARY_CITY} 1031 exchanges`,
            url: `${SITE_DOMAIN}/tools/exchange-cost-estimator`,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: SITE_DOMAIN,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Tools",
                  item: `${SITE_DOMAIN}/tools`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Exchange Cost Estimator",
                  item: `${SITE_DOMAIN}/tools/exchange-cost-estimator`,
                },
              ],
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Exchange Cost Estimator",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
            },
          }),
        }}
      />
    </div>
  );
}
