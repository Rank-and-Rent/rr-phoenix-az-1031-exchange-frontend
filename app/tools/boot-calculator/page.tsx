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
    <div className="min-h-screen bg-[#F5F3EF]">
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Boot Calculator", href: "/tools/boot-calculator" },
          ]}
        />

        <div className="space-y-8 pt-8">
          <header className="space-y-4">
            <h1 className="font-playfair text-4xl font-bold text-[#2A2A2A] sm:text-5xl">
              Boot Calculator
            </h1>
            <p className="text-base text-[#2A2A2A]/75 sm:text-lg">
              Calculate boot including cash received and mortgage relief from your 1031 exchange.
              Boot is any non like kind property or cash received and is subject to immediate
              taxation.
            </p>
          </header>

          <BootCalculator />

          <div className="rounded-2xl border border-[#006E7F]/20 bg-[#006E7F]/8 p-6 text-sm text-[#2A2A2A]/80">
            <p className="font-semibold text-[#006E7F]">Educational content only.</p>
            <p className="mt-2">
              Not tax, legal, or investment advice. Results are estimates only. Consult a
              qualified intermediary and tax advisor before making decisions. A 1031 exchange
              defers federal and Arizona income tax on qualifying real property. It does not remove
              state or county transfer taxes.
            </p>
          </div>

          <div className="space-y-4 border-t border-[#2A2A2A]/10 pt-8">
            <h2 className="font-playfair text-2xl font-bold text-[#2A2A2A]">
              Related Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/boot-calculation-support"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Boot Calculation Support Services
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/exchange-cost-estimator"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Exchange Cost Estimator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/identification-rules-checker"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Identification Rules Checker
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


