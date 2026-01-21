import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { BootCalculator } from "@/components/tools/boot-calculator";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange Tools",
  description: `Calculate boot including cash received and mortgage relief for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} 1031 exchanges. Estimate tax implications on boot.`,
  keywords: [
    "boot calculator",
    "1031 exchange boot",
    "mortgage boot",
    "cash boot",
    `${PRIMARY_CITY} 1031 exchange`,
  ],
  openGraph: {
    title: "Boot Calculator | 1031 Exchange Tools",
    description: `Calculate boot and estimate tax implications for ${PRIMARY_CITY} 1031 exchanges.`,
    type: "website",
    url: `${SITE_DOMAIN}/tools/boot-calculator`,
  },
  alternates: {
    canonical: `${SITE_DOMAIN}/tools/boot-calculator`,
  },
};

export default function BootCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Boot Calculator", href: "/tools/boot-calculator" },
          ]}
        />

        <div className="pt-8">
          <header className="mb-8">
            <p className="section-label mb-3">Tool</p>
            <h1 className="font-serif text-4xl text-mansion-charcoal sm:text-5xl">
              Boot Calculator
            </h1>
            <p className="mt-4 text-base text-mansion-charcoal/70 sm:text-lg">
              Calculate boot including cash received and mortgage relief from your 1031 exchange.
              Boot is any non like kind property or cash received and is subject to immediate
              taxation.
            </p>
          </header>

          <BootCalculator />

          <div className="mt-8 border border-mansion-gold/20 bg-mansion-gold/5 p-6 text-sm text-mansion-charcoal/80">
            <p className="font-semibold text-mansion-gold-dark">Educational content only.</p>
            <p className="mt-2">
              Not tax, legal, or investment advice. Results are estimates only. Consult a
              qualified intermediary and tax advisor before making decisions. A 1031 exchange
              defers federal and Arizona income tax on qualifying real property. It does not remove
              state or county transfer taxes.
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
                  href="/services/boot-calculation-support"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Boot Calculation Support Services &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/exchange-cost-estimator"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Exchange Cost Estimator &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/identification-rules-checker"
                  className="text-mansion-gold hover:text-mansion-gold-dark"
                >
                  Identification Rules Checker &rarr;
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
            name: "Boot Calculator",
            description: `Calculate boot and estimate tax implications for ${PRIMARY_CITY} 1031 exchanges`,
            url: `${SITE_DOMAIN}/tools/boot-calculator`,
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
                  name: "Boot Calculator",
                  item: `${SITE_DOMAIN}/tools/boot-calculator`,
                },
              ],
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Boot Calculator",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
            },
          }),
        }}
      />
    </div>
  );
}
