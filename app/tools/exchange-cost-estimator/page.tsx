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
    <div className="min-h-screen bg-[#F5F3EF]">
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
          ]}
        />

        <div className="space-y-8 pt-8">
          <header className="space-y-4">
            <h1 className="font-playfair text-4xl font-bold text-[#2A2A2A] sm:text-5xl">
              Exchange Cost Estimator
            </h1>
            <p className="text-base text-[#2A2A2A]/75 sm:text-lg">
              Estimate the costs associated with your 1031 exchange including qualified
              intermediary fees, escrow costs, title insurance, and recording fees for {PRIMARY_CITY}{" "}
              transactions.
            </p>
          </header>

          <ExchangeCostEstimator />

          <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6 text-sm text-[#2A2A2A]/80">
            <p className="font-semibold text-[#006E7F]">Educational content only.</p>
            <p className="mt-2">
              Not tax, legal, or investment advice. Results are estimates only. Actual costs vary
              by provider and transaction details. Consult a qualified intermediary and tax advisor
              before making decisions. Arizona does not impose a state real estate transfer tax.
              Recording fees and title insurance premiums still apply.
            </p>
          </div>

          <div className="space-y-4 border-t border-[#2A2A2A]/10 pt-8">
            <h2 className="font-playfair text-2xl font-bold text-[#2A2A2A]">
              Related Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/qualified-intermediary-coordination"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Qualified Intermediary Coordination
                </Link>
              </li>
              <li>
                <Link
                  href="/services/escrow-and-title-coordination"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Escrow and Title Coordination
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/boot-calculator"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Boot Calculator
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


