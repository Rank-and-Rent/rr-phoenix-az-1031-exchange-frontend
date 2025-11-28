import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { IdentificationRulesChecker } from "@/components/tools/identification-rules-checker";
import {
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_DOMAIN,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange Tools",
  description: `Validate your 1031 exchange identification against three property, two hundred percent, or ninety five percent rules for ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} exchanges.`,
  keywords: [
    "identification rules checker",
    "1031 identification rules",
    "three property rule",
    "two hundred percent rule",
    `${PRIMARY_CITY} 1031 exchange`,
  ],
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange Tools",
    description: `Validate identification rules for ${PRIMARY_CITY} 1031 exchanges.`,
    type: "website",
    url: `${SITE_DOMAIN}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `${SITE_DOMAIN}/tools/identification-rules-checker`,
  },
};

export default function IdentificationRulesCheckerPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            {
              label: "Identification Rules Checker",
              href: "/tools/identification-rules-checker",
            },
          ]}
        />

        <div className="space-y-8 pt-8">
          <header className="space-y-4">
            <h1 className="font-playfair text-4xl font-bold text-[#2A2A2A] sm:text-5xl">
              Identification Rules Checker
            </h1>
            <p className="text-base text-[#2A2A2A]/75 sm:text-lg">
              Validate your replacement property identification against IRS identification rules. You
              must identify replacement properties within forty five days and comply with one of
              three identification rules.
            </p>
          </header>

          <IdentificationRulesChecker />

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
                  href="/services/three-property-identification-strategy"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Three Property Identification Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/services/two-hundred-percent-identification-strategy"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Two Hundred Percent Identification Strategy
                </Link>
              </li>
              <li>
                <Link
                  href="/services/identification-deadline-tracking"
                  className="text-[#006E7F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006E7F]"
                >
                  Identification Deadline Tracking
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
            name: "Identification Rules Checker",
            description: `Validate identification rules for ${PRIMARY_CITY} 1031 exchanges`,
            url: `${SITE_DOMAIN}/tools/identification-rules-checker`,
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
                  name: "Identification Rules Checker",
                  item: `${SITE_DOMAIN}/tools/identification-rules-checker`,
                },
              ],
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "Identification Rules Checker",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
            },
          }),
        }}
      />
    </div>
  );
}


